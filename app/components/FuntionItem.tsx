'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useState } from 'react'
import { CallbackReturnType } from '@/types/CallbackReturnType'

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
    <div className="bg-gray-600 flex flex-col p-2 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center">{fnMsg.name}</div>
        <Button onClick={() => onDelete(fnMsg)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          {fnMsg?.inputs?.map((input: any, index: any) => {
            return (
              <div key={index}>
                <div className="flex justify-start">
                  <div className="mr-4">{input.name}</div>
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
        </div>
        <div>
          {fnMsg?.state_mutability === 'view' ? (
            <Button variant="destructive" type="submit">
              Read
            </Button>
          ) : (
            <Button variant="destructive" type="submit">
              Wrtie
            </Button>
          )}
        </div>
      </form>
      <div>{response}</div>
    </div>
  )
}
