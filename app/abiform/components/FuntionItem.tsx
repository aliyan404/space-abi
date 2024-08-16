'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X, Book, Edit } from 'lucide-react'
import { useState } from 'react'
import { CallbackReturnType } from '@/types'
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
    <Card className="overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-indigo-50 to-purple-50">
      <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 py-4 border-b border-indigo-200">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-purple-800">
            {fnMsg.name}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(fnMsg)}
            className="text-indigo-500 hover:text-red-500 hover:bg-indigo-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 py-6 px-6 bg-white">
          {fnMsg?.inputs?.map((input: any, index: any) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-indigo-700">
                <span className="font-medium">{input.name}:</span>
                <span className="text-indigo-500">({input.type})</span>
              </div>
              <Input
                placeholder={input.name}
                name={input.name}
                onChange={handleChange}
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          ))}
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-indigo-100 to-purple-100 py-4 px-6 flex justify-between items-center border-t border-indigo-200">
          <div className="text-sm text-indigo-700">{response}</div>
          {fnMsg?.state_mutability === 'view' ? (
            <Button
              variant="outline"
              type="submit"
              className="bg-white text-purple-600 hover:bg-purple-50 border-purple-300 flex items-center space-x-2"
            >
              <Book size={16} />
              <span>Read</span>
            </Button>
          ) : account ? (
            <Button
              variant="outline"
              type="submit"
              className="bg-white text-purple-600 hover:bg-purple-50 border-purple-300 flex items-center space-x-2"
            >
              <Edit size={16} />
              <span>Write</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              disabled
              className="bg-gray-100 text-gray-400 border-gray-300"
            >
              Connect Wallet
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
