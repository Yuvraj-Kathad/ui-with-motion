import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Successful authentication, redirect to the main landing page
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Missing code or error during exchange
  return NextResponse.redirect(new URL('/login?error=auth_failed', request.url))
}
