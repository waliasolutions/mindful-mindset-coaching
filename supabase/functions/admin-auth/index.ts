
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper function to parse IP address from headers
function parseClientIP(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  
  // If x-forwarded-for exists, split by comma and take the first IP
  if (forwardedFor) {
    const firstIP = forwardedFor.split(',')[0].trim();
    if (firstIP) {
      return firstIP;
    }
  }
  
  // Fallback to x-real-ip
  if (realIP) {
    return realIP.trim();
  }
  
  // Final fallback
  return '127.0.0.1';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, email, password, sessionToken, newUserEmail, newUserPassword, newUserRole, userId, updateData } = await req.json()

    if (action === 'login') {
      // Get client IP and user agent for security logging
      const clientIP = parseClientIP(req);
      const userAgent = req.headers.get('user-agent') || ''

      console.log(`Login attempt for email: ${email} from IP: ${clientIP}`)

      // First check if user exists and get basic info for debugging
      const { data: userCheck, error: userCheckError } = await supabase
        .from('admin_users')
        .select('id, email, role, is_active, failed_login_attempts, locked_until')
        .eq('email', email)
        .single()

      if (userCheckError || !userCheck) {
        console.log(`User not found: ${email}`)
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'Invalid credentials',
            user_data: null,
            session_token: null
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log(`User found: ${JSON.stringify({
        id: userCheck.id,
        email: userCheck.email,
        role: userCheck.role,
        is_active: userCheck.is_active,
        failed_attempts: userCheck.failed_login_attempts,
        locked_until: userCheck.locked_until
      })}`)

      // Check if account is locked
      if (userCheck.locked_until && new Date(userCheck.locked_until) > new Date()) {
        console.log(`Account locked until: ${userCheck.locked_until}`)
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'Account temporarily locked due to too many failed attempts',
            user_data: null,
            session_token: null
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Now call the admin_login function
      const { data, error } = await supabase.rpc('admin_login', {
        email_input: email,
        password_input: password,
        ip_address_input: clientIP,
        user_agent_input: userAgent
      })

      if (error) {
        console.error('Login function error:', error)
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'Authentication failed',
            user_data: null,
            session_token: null
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }

      const result = data[0]
      console.log('Login result:', JSON.stringify(result, null, 2))

      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'validate') {
      // Validate session token
      const { data, error } = await supabase.rpc('validate_admin_session', {
        session_token_input: sessionToken
      })

      if (error) {
        console.error('Session validation error:', error)
        return new Response(
          JSON.stringify({ valid: false }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const result = data[0]
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'logout') {
      // Logout and invalidate session
      const { data, error } = await supabase.rpc('admin_logout', {
        session_token_input: sessionToken
      })

      if (error) {
        console.error('Logout error:', error)
        return new Response(
          JSON.stringify({ success: false }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'register') {
      // Validate session first
      const { data: sessionData, error: sessionError } = await supabase.rpc('validate_admin_session', {
        session_token_input: sessionToken
      })

      if (sessionError || !sessionData || !sessionData[0]?.valid) {
        return new Response(
          JSON.stringify({ success: false, message: 'Unauthorized' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        )
      }

      const currentUser = sessionData[0].user_data
      if (currentUser.role !== 'admin') {
        return new Response(
          JSON.stringify({ success: false, message: 'Admin access required' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
        )
      }

      // Create new user using the database function
      const { data, error } = await supabase.rpc('create_admin_user', {
        email_input: newUserEmail,
        password_input: newUserPassword,
        role_input: newUserRole || 'client'
      })

      if (error) {
        console.error('User registration error:', error)
        return new Response(
          JSON.stringify({ success: false, message: 'Failed to create user' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }

      const result = data[0]
      if (!result.success) {
        return new Response(
          JSON.stringify({ success: false, message: result.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: result.message, 
          user: result.user_data 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'updateUser') {
      // Validate session and admin role
      const { data: sessionData, error: sessionError } = await supabase.rpc('validate_admin_session', {
        session_token_input: sessionToken
      })

      if (sessionError || !sessionData || !sessionData[0]?.valid) {
        return new Response(
          JSON.stringify({ success: false, message: 'Unauthorized' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        )
      }

      const currentUser = sessionData[0].user_data
      if (currentUser.role !== 'admin') {
        return new Response(
          JSON.stringify({ success: false, message: 'Admin access required' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
        )
      }

      // Update user using the database function
      const { data, error } = await supabase.rpc('update_admin_user', {
        user_id_input: userId,
        email_input: updateData.email || null,
        password_input: updateData.password || null,
        role_input: updateData.role || null,
        is_active_input: updateData.hasOwnProperty('is_active') ? updateData.is_active : null
      })

      if (error) {
        console.error('User update error:', error)
        return new Response(
          JSON.stringify({ success: false, message: 'Failed to update user' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }

      const result = data[0]
      if (!result.success) {
        return new Response(
          JSON.stringify({ success: false, message: result.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: result.message, 
          user: result.user_data 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'getUsers') {
      // Validate session and admin role
      const { data: sessionData, error: sessionError } = await supabase.rpc('validate_admin_session', {
        session_token_input: sessionToken
      })

      if (sessionError || !sessionData || !sessionData[0]?.valid) {
        return new Response(
          JSON.stringify({ success: false, message: 'Unauthorized' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        )
      }

      const currentUser = sessionData[0].user_data
      if (currentUser.role !== 'admin') {
        return new Response(
          JSON.stringify({ success: false, message: 'Admin access required' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
        )
      }

      // Get all users
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, role, is_active, created_at, last_login_at')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Get users error:', error)
        return new Response(
          JSON.stringify({ success: false, message: 'Failed to fetch users' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }

      return new Response(
        JSON.stringify({ success: true, users: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )

  } catch (error) {
    console.error('Admin auth error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
