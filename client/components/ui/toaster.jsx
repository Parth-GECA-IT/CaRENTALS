"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  // Static mock data instead of fetched data
  const mockToasts = [
    {
      id: "toast-1",
      title: "Success",
      description: "Your action was completed successfully.",
      variant: "default",
    },
    {
      id: "toast-2",
      title: "Error",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    }
  ]

  return (
    <ToastProvider>
      {mockToasts.map(function ({ id, title, description, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
