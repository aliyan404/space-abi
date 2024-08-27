import { CallbackReturnType, ContractAddressType } from '@/types'
import { Abi, Contract } from 'starknet'
import { getContractAbi } from './abi'
import toast from 'react-hot-toast'
import { mainnet, sepolia } from '@starknet-react/chains'

async function getContractType(
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

async function interact(
  value: CallbackReturnType,
  address: string,
  rpcProvider: any,
  intearctNetwork: string,
  connectNetwork: string,
  account?: any
) {
  const chains = { mainnet, sepolia } as const
  try {
    const abi = await getContractAbi(address, rpcProvider)
    const contract = new Contract(abi!, address, rpcProvider)

    if (value?.stateMutability === 'view') {
      const res = await contract.call(value.functionName, value.inputs)
      console.log(value.functionName, ' result:', res)

      return { type: value.outputs[0]?.type, value: res.toString() }
    } else if (value?.stateMutability === 'external') {
      if (!account) {
        toast.error('Please connect your wallet')
        return
      }

      if (
        chains[intearctNetwork as keyof typeof chains]?.network !==
        connectNetwork
      ) {
        const expectedNetwork =
          connectNetwork === chains.sepolia.network ? 'Mainnet' : 'Sepolia'
        toast.error(`Please switch to ${expectedNetwork} network`)
        return { type: 'Error', value: 'null' }
      }

      contract.connect(account)
      const res = await contract.invoke(value.functionName, value.inputs)
      return { type: value.outputs[0]?.type, value: res.toString() }
    }
  } catch (error) {
    console.log('interact error:', error)
  }
}

export { getContractType, interact}
