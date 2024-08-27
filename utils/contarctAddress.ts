import { ContractAddressType } from '@/types'

async function getAddressType(
  address: string,
  rpcProvider: any
): Promise<ContractAddressType> {
  const { abi } = await rpcProvider.getClassAt(address)

  const proxyFunctions = ['__default__', 'getImplementationHash', 'upgrade']
  const hasProxyFunctions = proxyFunctions.some((func) =>
    abi.some((item: any) => item.type === 'function' && item.name === func)
  )

  return hasProxyFunctions ? 'Proxy' : 'Normal'
}

export { getAddressType }
