import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient(
    "https://moeibefkzvxueynbxbhy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZWliZWZrenZ4dWV5bmJ4Ymh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNDE1NTYsImV4cCI6MjA3NDgxNzU1Nn0.2Fb-VDylUxBqE0fMcxOsAkkIUC0H2p6Xpobn_iEuv7o",
  )

  return client
}
