'use client'
import { useAccount, useConnect } from '@starknet-react/core'
import { useStarknetkitConnectModal } from 'starknetkit'
import { Button } from './ui/button'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { DisConnectModel } from './disconnect-model'
import { useNetProvider } from '@/hooks/useNetProvider'
import { mainnet, sepolia } from '@starknet-react/chains'

export default function ConnectModel() {
  const { connect, connectors } = useConnect()
  const { network } = useNetProvider()
  const { address } = useAccount()
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as any,
    modalTheme: 'dark',
  })
  const [isLoading, setIsLoading] = useState(false)
  const chains = { mainnet: mainnet, sepolia: sepolia } as any

  const buttonClasses =
    'bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1'

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      const { connector } = await starknetkitConnectModal()

      const connectChainId = await connector?.chainId()

      if (connectChainId !== chains[network].id) {
        if (connectChainId === chains['mainnet'].id) {
          toast.error('Please switch to Sepolia Network')
          return
        } else if (connectChainId === chains['sepolia'].id) {
          toast.error('Please switch to Mainnet Network')
          return
        }
      }

      await connect({ connector })
    } catch (error) {
      toast.error('Failed to connect wallet')
    } finally {
      setIsLoading(false)
    }
  }

  if (address) {
    return <DisConnectModel />
  }

  return (
    <>
      {isLoading ? (
        <Button
          disabled
          className={`${buttonClasses} opacity-50 cursor-not-allowed`}
        >
          Connecting...
        </Button>
      ) : (
        <Button onClick={handleConnect} className={buttonClasses}>
          Connect Wallet
        </Button>
      )}
    </>
  )
}
