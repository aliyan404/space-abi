import { chainMap } from '@/constants'
import { RpcProvider } from 'starknet'

function getRpcProvider(network: string) {
  const rpcProvider = new RpcProvider({
    nodeUrl: chainMap[network as keyof typeof chainMap]?.rpcUrl,
  })
  return rpcProvider
}

export { getRpcProvider }
