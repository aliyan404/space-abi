'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X, Book, Edit, Loader2 } from 'lucide-react'
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { getStateMutability } from '@/utils/function'
import toast from 'react-hot-toast'
import { isAbiValid } from '@/utils'

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
  const [isLoading, setIsLoading] = useState(false)
  const [isAble, setIsAble] = useState(true)

  const handleChange = (e: any) => {
    console.log('Input changed:', e.target.name, e.target.value)
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddDecimals = (inputName: string) => {
    const currentValue = inputValues[inputName] || ''
    const newValue = currentValue ? `${currentValue}${'0'.repeat(18)}` : ''
    setInputValues({
      ...inputValues,
      [inputName]: newValue,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsAble(false)
    setIsLoading(true)
    const inputs = fnMsg?.inputs.map((value: any) => inputValues[value.name])
    const outputs = fnMsg?.outputs

    const callback: CallbackReturnType = {
      functionName: fnMsg?.name,
      stateMutability: getStateMutability(fnMsg),
      inputs: inputs,
      outputs: outputs,
    }

    try {
      await handleCallback(callback)
    } catch (error) {
      toast.error('Error submitting transaction')
    } finally {
      setIsLoading(false)
      setIsAble(true)
    }
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
              <div className="relative">
                <Input
                  required
                  placeholder={input.name}
                  name={input.name}
                  value={inputValues[input.name] || ''}
                  onChange={handleChange}
                  className="w-full border-indigo-200 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pr-10"
                />
                {input.type === 'core::integer::u256' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          onClick={() => handleAddDecimals(input.name)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-sm text-indigo-600 hover:text-indigo-800 bg-transparent hover:bg-transparent border-none"
                        >
                          *
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="center">
                        <p className="text-sm text-gray-500">
                          Multiply by 1e18
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-indigo-100 to-purple-100 py-4 px-6 flex justify-between items-center border-t border-indigo-200">
          <div className="text-sm text-indigo-700">{response}</div>
          {getStateMutability(fnMsg) === 'view' ? (
            <Button
              disabled={!isAble}
              variant="outline"
              type="submit"
              className="bg-white text-purple-600 hover:bg-purple-50 border-purple-300 flex items-center space-x-2"
            >
              <Book size={16} />
              {isLoading ? (
                <Loader2 className="h-5 w-5 text-gray-300 animate-spin" />
              ) : (
                <span>Read</span>
              )}
            </Button>
          ) : account ? (
            <Button
              disabled={!isAble}
              variant="outline"
              type="submit"
              className="bg-white text-purple-600 hover:bg-purple-50 border-purple-300 flex items-center space-x-2"
            >
              <Edit size={16} />
              {isLoading ? (
                <Loader2 className="h-5 w-5 text-gray-300 animate-spin" />
              ) : (
                <span>Write</span>
              )}
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
