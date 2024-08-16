'use client'
import { useAccount, useConnect } from '@starknet-react/core'
import { useStarknetkitConnectModal } from 'starknetkit'
import { Button } from './ui/button'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { DisConnectModel } from './disconnect-model'

export default function ConnectModel() {
  const { connect, connectors } = useConnect()
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as any,
    modalTheme: 'dark',
  })
  const [isLoading, setIsLoading] = useState(false)
  const {address} = useAccount()

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      const { connector } = await starknetkitConnectModal()
      await connect({ connector })
    } catch (error) {
      toast.error('Failed to connect wallet')
    } finally {
      setIsLoading(false)
    }
  }

  if(address){
    return (
      <DisConnectModel/>
    )
  }

  return (
    <>
      {isLoading ? (
        <Button disabled>Connencting...</Button>
      ) : (
        <Button onClick={handleConnect}>Connect Wallet</Button>
      )}
    </>
  )
}
