
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const { action, email, password, sessionToken } = await req.json()

    if (action === 'login') {
      // Get client IP and user agent for security logging
      const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
      const userAgent = req.headers.get('user-agent') || ''

      console.log(`Login attempt for email: ${email} from IP: ${clientIP}`)

      // Call the admin_login function
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
