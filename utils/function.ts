import { FunctionStateMutability } from '@/types'
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

function isImplementationHashFunction(functionName: string): boolean {
  const regex = /get.*implementation.*hash/i
  return regex.test(functionName)
}

function getStateMutability(func: any): FunctionStateMutability {
  if ('state_mutability' in func) {
    return (func as any).state_mutability as FunctionStateMutability
  }
  if ('stateMutability' in func) {
    return (func as any).stateMutability as FunctionStateMutability
  }
  return 'external'
}

export { getFunctionList, isImplementationHashFunction, getStateMutability }
