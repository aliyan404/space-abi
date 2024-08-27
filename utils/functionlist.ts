import { Abi } from 'starknet'

function getFunctionList(abi: Abi | undefined): any[] {
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
  console.log('getFunctionList', functions)
  return functions
}

export { getFunctionList }
