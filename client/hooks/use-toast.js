"use client"
import React, { createContext, useContext, useState } from "react"
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "@/components/ui/toast"

const ToastContext = createContext()

export function ToastProviderWrapper({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = (toast) => {
    setToasts((prev) => [...prev, { id: Date.now(), ...toast }])
    setTimeout(() => {
      setToasts((prev) => prev.slice(1)) // auto-remove after 3s
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} variant={toast.variant}>
            <div className="flex flex-col space-y-1">
              <ToastTitle>{toast.title}</ToastTitle>
              <ToastDescription>{toast.description}</ToastDescription>
            </div>
            {toast.action && <ToastAction onClick={toast.action.onClick}>{toast.action.label}</ToastAction>}
            <ToastClose />
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)