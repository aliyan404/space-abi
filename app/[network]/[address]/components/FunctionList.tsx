'use client'

import useFunction from '@/hooks/useFunction'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function FunctionList({
  contractAddress,
  selectFunctions,
  onSelect,
  onDelete,
}: {
  contractAddress: any
  selectFunctions: any[]
  onSelect: any
  onDelete: any
}) {
  const functionsData = useFunction(contractAddress)

  const handleAdd = (fn: any) => {
    onSelect(fn)
  }

  const handleCancel = (e: React.MouseEvent, fn: any) => {
    e.stopPropagation()
    onDelete(fn)
  }

  return (
    <div className="fixed left-0 top-16 bottom-0 w-72 bg-white shadow-lg p-4 flex flex-col">
      <ScrollArea className="h-full w-full pr-4">
        <Accordion
          type="multiple"
          defaultValue={['read', 'write']}
          className="w-full space-y-2"
        >
          <AccordionItem value="read" className="border-b">
            <AccordionTrigger className="text-lg font-semibold px-2 py-3 text-blue-600 hover:text-blue-800">
              Read Functions
            </AccordionTrigger>
            <AccordionContent className="p-2 space-y-1">
              {functionsData
                ?.filter(
                  (fn: any) =>
                    fn.state_mutability === 'view' && fn.inputs.length > 0
                )
                ?.map((fn: any) => (
                  <Button
                    key={fn.name}
                    variant="ghost"
                    className={`w-full justify-between text-left py-1 px-2 ${
                      selectFunctions.find((f) => f.name === fn.name)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleAdd(fn)}
                  >
                    <span className="truncate">{fn.name}</span>
                    {selectFunctions.find((f) => f.name === fn.name) && (
                      <X
                        className="ml-2 flex-shrink-0 text-blue-500 hover:text-blue-700"
                        size={16}
                        onClick={(e) => handleCancel(e, fn)}
                      />
                    )}
                  </Button>
                ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="write" className="border-b">
            <AccordionTrigger className="text-lg font-semibold px-2 py-3 text-purple-600 hover:text-purple-800">
              Write Functions
            </AccordionTrigger>
            <AccordionContent className="p-2 space-y-1">
              {functionsData
                ?.filter(
                  (fn: any) =>
                    fn.state_mutability === 'external' && fn.inputs.length > 0
                )
                ?.map((fn: any) => (
                  <Button
                    key={fn.name}
                    variant="ghost"
                    className={`w-full justify-between text-left py-1 px-2 ${
                      selectFunctions.find((f) => f.name === fn.name)
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleAdd(fn)}
                  >
                    <span className="truncate">{fn.name}</span>
                    {selectFunctions.find((f) => f.name === fn.name) && (
                      <X
                        className="ml-2 flex-shrink-0 text-purple-500 hover:text-purple-700"
                        size={16}
                        onClick={(e) => handleCancel(e, fn)}
                      />
                    )}
                  </Button>
                ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  )
}
