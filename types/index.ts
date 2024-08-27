type CallbackReturnType = {
  functionName: string
  stateMutability: string
  inputs: any[]
  outputs: any[]
}

type ContarctMsgReturnType = {
  functionName: string
  result: InteractReturnType
}

type InteractReturnType = {
  type: string
  value: string
}

type ContractAddressType = 'Proxy' | 'Normal'

export type {
  CallbackReturnType,
  ContarctMsgReturnType,
  InteractReturnType,
  ContractAddressType,
}
