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

      const { data, error } = await supabase.rpc('admin_login', {
        email_input: email,
        password_input: password,
        ip_address_input: clientIP,
        user_agent_input: userAgent
      })

      if (error) {
        console.error('Login function error:', error)
        return new Response(
          JSON.stringify({ success: false, message: 'Authentication failed' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }

      const result = data[0]
      console.log('Login result:', result)

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

      // Register new user using raw SQL to properly hash password
      const { data, error } = await supabase
        .rpc('sql', {
          query: `
            INSERT INTO admin_users (email, password_hash, role) 
            VALUES ($1, crypt($2, gen_salt('bf')), $3) 
            RETURNING id, email, role, is_active, created_at
          `,
          params: [newUserEmail, newUserPassword, newUserRole || 'client']
        })

      if (error) {
        console.error('User registration error:', error)
        return new Response(
          JSON.stringify({ success: false, message: 'Failed to create user' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }

      return new Response(
        JSON.stringify({ success: true, message: 'User created successfully', user: data[0] }),
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

      // Build update query based on provided data
      let updateQuery = 'UPDATE admin_users SET updated_at = NOW()'
      const params = [userId]
      let paramIndex = 2

      if (updateData.email) {
        updateQuery += `, email = $${paramIndex}`
        params.push(updateData.email)
        paramIndex++
      }

      if (updateData.role) {
        updateQuery += `, role = $${paramIndex}`
        params.push(updateData.role)
        paramIndex++
      }

      if (updateData.hasOwnProperty('is_active')) {
        updateQuery += `, is_active = $${paramIndex}`
        params.push(updateData.is_active)
        paramIndex++
      }

      if (updateData.password) {
        updateQuery += `, password_hash = crypt($${paramIndex}, gen_salt('bf'))`
        params.push(updateData.password)
        paramIndex++
      }

      updateQuery += ' WHERE id = $1 RETURNING id, email, role, is_active, created_at, last_login_at'

      const { data, error } = await supabase.rpc('sql', {
        query: updateQuery,
        params: params
      })

      if (error) {
        console.error('User update error:', error)
        return new Response(
          JSON.stringify({ success: false, message: 'Failed to update user' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }

      if (!data || data.length === 0) {
        return new Response(
          JSON.stringify({ success: false, message: 'User not found' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
        )
      }

      return new Response(
        JSON.stringify({ success: true, message: 'User updated successfully', user: data[0] }),
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
