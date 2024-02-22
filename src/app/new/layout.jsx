"use client"
import { SessionProvider } from 'next-auth/react'

function newLayout({children}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default newLayout