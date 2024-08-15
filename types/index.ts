type CallbackReturnType = {
  functionName: string
  stateMutability: string
  inputs: any[]
}

type ContarctMsgReturnType = {
  functionName: string
  res: string
}

export type { CallbackReturnType, ContarctMsgReturnType }
