import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  if (code) {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if user exists in database
      const { data: existingUser } = await supabase
        .from("usuario")
        .select("id_user")
        .eq("correo", data.user.email)
        .single()

      // If user doesn't exist, create them
      if (!existingUser && data.user.user_metadata) {
        await supabase.from("usuario").insert({
          nombre_usuario: data.user.user_metadata.nombre_usuario || data.user.email?.split("@")[0],
          nombre: data.user.user_metadata.nombre || "Usuario",
          apellido: data.user.user_metadata.apellido || "",
          correo: data.user.email,
          contrasenia: "",
          id_rol: 2,
        })
      }
    }
  }

  // Redirect to dashboard
  return NextResponse.redirect(`${origin}/dashboard`)
}
