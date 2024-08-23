import Header from '@/app/components/Header'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
