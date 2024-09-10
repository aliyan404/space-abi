import { CallbackReturnType, ContractAddressType } from '@/types'
import { Contract } from 'starknet'
import { getContractAbi } from './abi'
import toast from 'react-hot-toast'
import { isImplementationHashFunction } from './function'
import { getRpcProvider } from './rpcProvider'

async function getContractType(
  address: string,
  rpcProvider: any
): Promise<ContractAddressType> {
  const { abi } = await rpcProvider.getClassAt(address)
  const getImplementationFn = abi.find(
    (i: any) => isImplementationHashFunction(i.name) && i.type === 'function'
  )
  return getImplementationFn ? 'Proxy' : 'Normal'
}

async function read(
  value: CallbackReturnType,
  address: string,
  intearctNetwork: string
) {
  const rpcProvider = getRpcProvider(intearctNetwork)
  const abi = await getContractAbi(address, rpcProvider)
  const contract = new Contract(abi!, address, rpcProvider)

  const res = await contract.call(value.functionName, value.inputs)
  console.log(value.functionName, ' result:', res)
  const showRes = stringifyResult(res)
  return { type: value.outputs[0]?.type, value: showRes }
}

async function write(
  value: CallbackReturnType,
  address: string,
  intearctNetwork: string,
  account?: any
) {
  const rpcProvider = getRpcProvider(intearctNetwork)
  const abi = await getContractAbi(address, rpcProvider)
  const contract = new Contract(abi!, address, rpcProvider)

  if (!account) {
    toast.error('Please connect your wallet')
    return
  }

  contract.connect(account)
  const tx_res = await contract.invoke(value.functionName, value.inputs)
  const tx_hash = tx_res?.transaction_hash

  const res = await rpcProvider.waitForTransaction(tx_hash)

  return res?.value
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

export { getContractType, read, write }
