import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function getSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    "https://moeibefkzvxueynbxbhy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZWliZWZrenZ4dWV5bmJ4Ymh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNDE1NTYsImV4cCI6MjA3NDgxNzU1Nn0.2Fb-VDylUxBqE0fMcxOsAkkIUC0H2p6Xpobn_iEuv7o",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )
}
