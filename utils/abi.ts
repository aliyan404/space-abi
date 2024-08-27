import { Abi, Contract } from 'starknet'
import { getAddressType } from './contarctAddress'

async function isAbiValid(address: string, rpcProvider: any): Promise<boolean> {
  try {
    const res = await getNormalAbi(address, rpcProvider)
    return true
  } catch (error) {
    return false
  }
}

async function getContractAbi(address: string, rpcProvider: any) {
  try {
    const type = await getAddressType(address, rpcProvider)
    const normalAbi = await getNormalAbi(address, rpcProvider)
    if (type === 'Normal') {
      return normalAbi
    } else if (type === 'Proxy') {
      const classHash = await getImplementedClassHash(
        normalAbi,
        address,
        rpcProvider
      )
      const classAbi = getImplementedClassAbi(classHash, rpcProvider)
      return classAbi
    }
  } catch (error) {
    console.log('getContractAbi error', error)
  }
}

async function getNormalAbi(address: string, rpcProvider: any): Promise<Abi> {
  const { abi } = await rpcProvider.getClassAt(address)
  return abi
}

async function getImplementedClassHash(
  abi: Abi,
  contractAddress: string,
  rpcProvider: any
): Promise<string> {
  const getImplementationFn = abi.find(
    (i: any) => i.name === 'getImplementationHash' && i.type === 'function'
  )

  const contract = new Contract(abi, contractAddress, rpcProvider)

  const res = await contract.call(
    getImplementationFn.name,
    getImplementationFn.inputs
  )

  const implementationValue = (res as any)?.implementation
  const finalRes = implementationValue ? decimalToHex(implementationValue) : ''
  return finalRes
}

async function getImplementedClassAbi(
  classHash: string,
  rpcProvider: any
): Promise<Abi> {
  const { abi } = await rpcProvider.getClassByHash(classHash)
  return abi
}

function decimalToHex(decimal: string): string {
  const bigIntValue = BigInt(decimal)
  let hexString = bigIntValue.toString(16)
  if (hexString.length % 2 !== 0) {
    hexString = '0' + hexString
  }

  return '0x' + hexString
}

export { getImplementedClassHash, getContractAbi, isAbiValid, getImplementedClassAbi }
