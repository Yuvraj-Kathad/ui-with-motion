import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  // Prevent open redirects: only allow absolute internal paths starting with / (but not //)
  let next = requestUrl.searchParams.get('next') ?? '/'
  if (!next.startsWith('/') || next.startsWith('//')) {
    next = '/'
  }
  
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Successful authentication, redirect to the main landing page or specified next URL
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  // Missing code or error during exchange
  return NextResponse.redirect(new URL('/login?error=auth_failed', request.url))
}
