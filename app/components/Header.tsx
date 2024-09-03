'use client'

import Link from 'next/link'
import ConnectModel from '@/components/connect-model'

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b px-6 bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200">
        <div className="hidden md:block text-lg font-bold text-blue-600">
          <Link href="/" prefetch={false}>
            <div className="flex items-center gap-2">
              <img src='/logo.png' className='w-[50px]' />
              Space ABI
            </div>
          </Link>
        </div>
        <div className="md:hidden" />
        <div className="flex items-center gap-4">
          <ConnectModel />
        </div>
      </header>
    </>
  )
}
