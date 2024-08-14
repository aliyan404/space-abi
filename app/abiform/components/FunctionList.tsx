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
    <div className="fixed left-0 top-16 bottom-0 w-64 bg-slate-400 p-4 flex flex-col">
      <ScrollArea className="h-full w-full realative pr-6">
        <Accordion
          type="multiple"
          defaultValue={['read', 'write']}
          className="w-full"
        >
          <AccordionItem value="read">
            <AccordionTrigger
              className="text-2xl font-bold"
              style={{ textDecoration: 'none' }}
            >
              Read
            </AccordionTrigger>
            <AccordionContent>
              {functionsData
                ?.filter((fn: any) => fn.state_mutability === 'view')
                ?.map((fn: any) => (
                  <Button
                    key={fn.name}
                    variant={
                      selectFunctions.find((f) => f.name === fn.name)
                        ? 'default'
                        : 'outline'
                    }
                    className="w-full justify-start my-1 pr-8 relative"
                    onClick={() => handleAdd(fn)}
                  >
                    {fn.name}
                    {selectFunctions.find((f) => f.name === fn.name) && (
                      <X
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        size={16}
                        onClick={(e) => handleCancel(e, fn)}
                      />
                    )}
                  </Button>
                ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="write">
            <AccordionTrigger
              className="text-2xl font-bold"
              style={{ textDecoration: 'none' }}
            >
              Write
            </AccordionTrigger>
            <AccordionContent>
              {functionsData
                ?.filter((fn: any) => fn.state_mutability === 'external')
                ?.map((fn: any) => (
                  <Button
                    key={fn.name}
                    variant={
                      selectFunctions.find((f) => f.name === fn.name)
                        ? 'default'
                        : 'outline'
                    }
                    className="w-full justify-start my-1 pr-8 relative"
                    onClick={() => handleAdd(fn)}
                  >
                    {fn.name}
                    {selectFunctions.find((f) => f.name === fn.name) && (
                      <X
                        className="text-white absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
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
