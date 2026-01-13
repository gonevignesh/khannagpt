import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    // GUEST MODE: Skip all authentication checks
    // All routes are now accessible without login
    // Remove or modify this section when you want to re-enable authentication

    let supabaseResponse = NextResponse.next({
        request,
    })

    // Still create the Supabase client to maintain session for logged-in users
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet: any) {
                    cookiesToSet.forEach(({ name, value, options }: any) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }: any) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    );

    // Get user but don't enforce authentication
    await supabase.auth.getUser()

    // GUEST MODE: All routes are public, no redirects
    return supabaseResponse
};
