'use client'

import WalletBar from './WalletBar'

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
        <div className="text-lg font-bold">Space ABI</div>
        <div className="flex items-center gap-4">
          <WalletBar />
        </div>
      </header>
    </>
  )
}
