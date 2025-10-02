"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface ForgotPasswordModalProps {
  open: boolean
  onClose: () => void
}

export function ForgotPasswordModal({ open, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const supabase = getSupabaseBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        onClose()
        setEmail("")
        setSuccess(false)
      }, 3000)
    } catch (err: any) {
      setError(err.message || "Error al enviar el correo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#880430] border-none text-white max-w-md">
        <button onClick={onClose} className="absolute right-4 top-4 text-white hover:text-white/80">
          <X className="h-5 w-5" />
        </button>

        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-white text-center">Forgot your password?</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <p className="text-sm text-white/90 text-center">
            Enter the email address you used to sign up and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-white">
                Email
              </Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/90"
              />
            </div>

            {error && <p className="text-sm text-red-200">{error}</p>}
            {success && (
              <p className="text-sm text-green-200">Correo enviado exitosamente. Revisa tu bandeja de entrada.</p>
            )}

            <Button type="submit" disabled={loading} className="w-full bg-white text-[#880430] hover:bg-white/90">
              {loading ? "Enviando..." : "Continue"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
