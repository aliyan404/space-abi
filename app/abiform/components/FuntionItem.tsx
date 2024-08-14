'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useState } from 'react'
import { CallbackReturnType } from '@/types/CallbackReturnType'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAccount } from '@starknet-react/core'

export default function FunctionItem({
  fnMsg,
  onDelete,
  handleCallback,
  response,
}: {
  fnMsg: any
  onDelete: any
  handleCallback: any
  response: React.ReactNode
}) {
  const [inputValues, setInputValues] = useState<any>({})
  const { account } = useAccount()
  const handleChange = (e: any) => {
    console.log('Input changed:', e.target.name, e.target.value)
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('fnMsginputs', fnMsg?.inputs)
    console.log('inputValues', inputValues)
    const param = fnMsg?.inputs.map((value: any) => inputValues[value.name])
    console.log('param', param)

    const callback: CallbackReturnType = {
      functionName: fnMsg?.name,
      stateMutability: fnMsg?.state_mutability,
      inputs: param,
    }

    console.log('callback', callback)
    handleCallback(callback)
  }

  return (
    <Card className="flex flex-col rounded-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{fnMsg.name}</CardTitle>
          <Button onClick={() => onDelete(fnMsg)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          {fnMsg?.inputs?.map((input: any, index: any) => {
            return (
              <div key={index} className="mt-2 mb-2">
                <div className="flex justify-start">
                  <div className="mr-4 text-xl">{input.name}</div>
                  <div>{input.type}</div>
                </div>
                <Input
                  placeholder={input.name}
                  name={input.name}
                  onChange={handleChange}
                />
              </div>
            )
          })}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center h-10">{response}</div>
          {fnMsg?.state_mutability === 'view' ? (
            <Button variant="secondary" type="submit">
              Read
            </Button>
          ) : account ? (
            <Button variant="secondary" type="submit">
              Write
            </Button>
          ) : (
            <Button variant="destructive" disabled>
              Connect Wallet
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
