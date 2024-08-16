'use client'

import Link from 'next/link'
import WalletBar from './WalletBar'
import ConnectModel from '@/components/connect-model'

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
        <div className="text-lg font-bold">
          <Link href="/" prefetch={false}>Space ABI</Link>
        </div>
        <div className="flex items-center gap-4">
          <ConnectModel/>
        </div>
      </header>
    </>
  )
}
