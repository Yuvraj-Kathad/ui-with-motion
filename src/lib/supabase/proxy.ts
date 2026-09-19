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

  // Use getClaims for primary authorization without making a database query
  // Wait, the API for getClaims is: await supabase.auth.getClaims()
  // No, actually checking the session is often simpler: await supabase.auth.getSession()
  await supabase.auth.getClaims()

  // The proxy is primarily responsible for refreshing the session.
  // Route protection is handled gracefully at the component level or by layouts as needed.

  return supabaseResponse
}
