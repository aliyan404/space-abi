import { CallbackReturnType, ContractAddressType } from '@/types'
import { Contract } from 'starknet'
import { getContractAbi } from './abi'
import toast from 'react-hot-toast'
import { mainnet, sepolia } from '@starknet-react/chains'
import { isImplementationHashFunction } from './function'
import { getRpcProvider } from './rpcProvider'
import { chainMap } from '@/constants'

async function getContractType(
  address: string,
  rpcProvider: any
): Promise<ContractAddressType> {
  const { abi } = await rpcProvider.getClassAt(address)
  const getImplementationFn = abi.find(
    (i: any) => isImplementationHashFunction(i.name) && i.type === 'function'
  )
  // const proxyFunctions = ['__default__', 'getImplementationHash', 'upgrade']
  // const hasProxyFunctions = proxyFunctions.some((func) =>
  //   abi.some((item: any) => item.type === 'function' && item.name === func)
  // )

  return getImplementationFn ? 'Proxy' : 'Normal'
}

async function interact(
  value: CallbackReturnType,
  address: string,
  intearctNetwork: string,
  account?: any
) {
  const rpcProvider = getRpcProvider(intearctNetwork)
  try {
    const abi = await getContractAbi(address, rpcProvider)
    const contract = new Contract(abi!, address, rpcProvider)

    if (value?.stateMutability === 'view') {
      const res = await contract.call(value.functionName, value.inputs)
      console.log(value.functionName, ' result:', res)
      const showRes = stringifyResult(res)
      return { type: value.outputs[0]?.type, value: showRes }

    } else if (value?.stateMutability === 'external') {
      
      if (!account) {
        toast.error('Please connect your wallet')
        return
      }

      contract.connect(account)
      const res = await contract.invoke(value.functionName, value.inputs)
      const showRes = stringifyResult(res)
      return { type: value.outputs[0]?.type, value: showRes }
    }
  } catch (error) {
    console.log('interact error:', error)
  }
}

function stringifyResult(result: any) {
  if (typeof result === 'object') {
    return JSON.stringify(result, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  } else {
    return result.toString()
  }
}

export { getContractType, interact }
