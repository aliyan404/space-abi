'use client'
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core'
import { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button'

function WalletConnected() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const shortenedAddress = useMemo(() => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }, [address])

  return (
    <div>
      <span>Connected: {shortenedAddress}</span>
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </div>
  )
}

function ConnectWallet() {
  const { connectors, connect } = useConnect()

  const [mountedConnectors, setMountedConnectors] = useState<any>([])

  useEffect(() => {
    setMountedConnectors(connectors)
  }, [connectors])

  return (
    <div>
      <span>Choose a wallet: </span>
      {mountedConnectors?.map((connector: any) => {
        return (
          <Button
            key={connector?.id}
            onClick={() => connect({ connector })}
            className="gap-x-2 mr-2"
          >
            {connector.id}
          </Button>
        )
      })}
    </div>
  )
}

export default function WalletBar() {
  const { address } = useAccount()

  return address ? <WalletConnected /> : <ConnectWallet />
}
