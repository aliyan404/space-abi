type CallbackReturnType = {
  functionName: string
  stateMutability: string
  inputs: any[]
  outputs: any[]
}

type ContarctMsgReturnType = {
  functionName: string
  reslut: InteractReturnType
}

type InteractReturnType = {
  type: string
  value: string
}

export type { CallbackReturnType, ContarctMsgReturnType, InteractReturnType }
