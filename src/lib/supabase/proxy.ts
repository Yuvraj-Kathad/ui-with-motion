import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options: cookieOptions }) =>
            supabaseResponse.cookies.set(name, value, cookieOptions)
          )
        },
      },
    }
  )

  // Use getUser() to refresh the session automatically. 
  // We wrap it in a try-catch to prevent unhandled AuthApiErrors (like 'refresh_token_not_found') 
  // from crashing the request. The SSR client's setAll callback automatically clears the stale cookies.
  try {
    await supabase.auth.getUser()
  } catch (_err) {
    // Gracefully recover by ignoring the error; the user is now treated as logged out.
  }

  // The proxy is primarily responsible for refreshing the session.
  // Route protection is handled gracefully at the component level or by layouts as needed.

  return supabaseResponse
}
