"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { ForgotPasswordModal } from "@/components/auth/forgot-password-modal"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function LoginPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex">
        {/* Left side - Blue section with welcome message */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#66B5CB] items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#880430] rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10 text-center text-white max-w-md">
            <h1 className="text-5xl font-serif mb-6">¡Bienvenido!</h1>
            <p className="text-lg mb-8">Estamos a tu disposición para ayudarte</p>
            <button
              onClick={() => router.push("/register")}
              className="px-8 py-3 bg-white text-[#880430] rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Regístrate
            </button>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-[#66B5CB] via-[#66B5CB] to-[#880430]">
          <div className="w-full max-w-md">
            <div className="bg-[#880430]/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-serif text-white text-center mb-8">Inicio de Sesión</h2>
              <LoginForm
                onForgotPassword={() => setShowForgotPassword(true)}
                onRegister={() => router.push("/register")}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <ForgotPasswordModal open={showForgotPassword} onClose={() => setShowForgotPassword(false)} />
    </div>
  )
}
