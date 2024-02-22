"use client"
import { SessionProvider } from 'next-auth/react'

function dashboardLayout({children}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default dashboardLayout