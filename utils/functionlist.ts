import { Abi } from 'starknet'

function getFunctionList(abi: Abi):any[] {
  if (!abi) return []

  const allFunctions = abi.flatMap((item: any) => {
    if (item.type === 'function') {
      return [item]
    } else if (item.type === 'interface') {
      return item?.items || []
    } else {
      return []
    }
  })

  const functions = allFunctions.filter((item: any) => item.type === 'function')
  return functions
}

function getAddressType(abi: Abi) {
  const proxyFunctions = ['__default__', 'getImplementationHash', 'upgrade']
  const hasProxyFunctions = proxyFunctions.some((func) =>
    abi.some((item) => item.type === 'function' && item.name === func)
  )

  return hasProxyFunctions ? 'Class' : 'Contract'
}


export { getFunctionList, getAddressType }