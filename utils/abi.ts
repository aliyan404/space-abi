import { Abi, Contract } from 'starknet'

async function getImplementedClass(
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


export { getImplementedClass, getImplementedClassAbi }
