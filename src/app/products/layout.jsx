"use client"
import { SessionProvider } from 'next-auth/react'

function productsLayout({ children }) {
  return (
    <SessionProvider>
      <div className="container mx-auto">
        {children}
      </div>
    </SessionProvider>
  )
}

export default productsLayout