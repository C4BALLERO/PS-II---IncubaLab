"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LoginFormProps {
  onForgotPassword: () => void
  onRegister: () => void
}

export function LoginForm({ onForgotPassword, onRegister }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Get user role from database
      const { data: userData, error: userError } = await supabase
        .from("usuario")
        .select("id_rol")
        .eq("correo", email)
        .single()

      if (userError) throw userError

      // Redirect based on role
      if (userData.id_rol === 1) {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Error al enviar el enlace de verificación")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-4 text-center">
        <div className="bg-white/10 border border-white/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-2">¡Revisa tu correo!</h3>
          <p className="text-white/90">
            Te hemos enviado un enlace de verificación a <strong>{email}</strong>
          </p>
          <p className="text-white/80 text-sm mt-2">Haz clic en el enlace para iniciar sesión</p>
        </div>
        <Button
          onClick={() => setSuccess(false)}
          variant="outline"
          className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20"
        >
          Enviar otro enlace
        </Button>
      </div>
    )
  }

  return (
    <Tabs defaultValue="password" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="password">Contraseña</TabsTrigger>
        <TabsTrigger value="magic">Enlace Mágico</TabsTrigger>
      </TabsList>

      <TabsContent value="password">
        <form onSubmit={handlePasswordLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email-password" className="text-white">
              Email
            </Label>
            <Input
              id="email-password"
              type="email"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/90"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/90"
            />
          </div>

          {error && <p className="text-sm text-red-200">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full bg-white text-[#880430] hover:bg-white/90">
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-white hover:underline block w-full"
            >
              ¿Olvidaste tu contraseña?
            </button>
            <button type="button" onClick={onRegister} className="text-sm text-white hover:underline block w-full">
              ¿No tienes una cuenta? Regístrate
            </button>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="magic">
        <form onSubmit={handleMagicLinkLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email-magic" className="text-white">
              Email
            </Label>
            <Input
              id="email-magic"
              type="email"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/90"
            />
          </div>

          {error && <p className="text-sm text-red-200">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full bg-white text-[#880430] hover:bg-white/90">
            {loading ? "Enviando..." : "Enviar enlace de verificación"}
          </Button>

          <div className="text-center">
            <button type="button" onClick={onRegister} className="text-sm text-white hover:underline">
              ¿No tienes una cuenta? Regístrate
            </button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  )
}
