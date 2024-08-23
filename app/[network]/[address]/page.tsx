'use client'

import { useState } from 'react'
import FunctionList from '@/app/[network]/[address]/components/FunctionList'
import FunctionForm from './components/FunctionForm'
import { CallbackReturnType } from '@/types'
import { useParams } from 'next/navigation'
import ContractMsg from './components/ContractMsg'
import useInteract from '@/hooks/useInteract'
import { Button } from '@/components/ui/button'
import { AlignJustify, X } from 'lucide-react'
import { interactSwitchRes } from '@/utils'

export default function ABIForm() {
  const params = useParams()
  const contractAddress = params.address
  const { interact, isContractReady } = useInteract(contractAddress as string)
  const [selectFunctions, setSelectFunctions] = useState<any[]>([])
  const [response, setResponse] = useState<Record<string, React.ReactNode>>({})

  const handleSelect = (fn: any) => {
    if (!selectFunctions.find((f) => f.name === fn.name)) {
      setSelectFunctions([...selectFunctions, fn])
    }
  }

  const handleDelete = (fn: any) => {
    setSelectFunctions(selectFunctions.filter((f: any) => f.name !== fn.name))
  }

  const handleCall = async (value: CallbackReturnType) => {
    try {
      if (isContractReady) {
        const res = await interact(value)
        setResponse({
          ...response,
          [value.functionName]: (
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
              <h2 className="font-bold text-gray-700 mb-2">Result:</h2>
              <div className="bg-gray-100 p-2 rounded">
                {interactSwitchRes(res?.type, res?.value)}
              </div>
            </div>
          ),
        })
      }
    } catch (error: any) {
      console.log('handleCall error', error)
    }
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Button
        className="md:hidden fixed top-2 left-2 z-50 bg-transparent text-blue-500 p-2 rounded "
        size="icon"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X /> : <AlignJustify />}
      </Button>

      <main className="flex flex-col md:flex-row">
        <div
          className={`
            fixed md:sticky top-0 left-0 h-screen bg-white transition-transform duration-300 ease-in-out z-40
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:w-[260px] min-w-[260px] max-w-[260px]
            overflow-x-hidden mr-4
          `}
        >
          <FunctionList
            contractAddress={contractAddress}
            selectFunctions={selectFunctions}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        </div>
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-2/3 p-4">
            <FunctionForm
              selectFuctions={selectFunctions}
              onDelete={handleDelete}
              handleCallback={handleCall}
              response={response}
            />
          </div>
          <div className="w-full md:w-1/3 p-4">
            <ContractMsg contractAddress={contractAddress as string} />
          </div>
        </div>
      </main>
    </div>
  )
}
