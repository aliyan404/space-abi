'use client'

import useFunction from '@/hooks/useFunction'
import { Listbox, ListboxItem } from '@nextui-org/listbox'

export default function FunctionList({
  contractAddress,
  onSelect,
}: {
  contractAddress: any
  onSelect: any
}) {
  const functionsData = useFunction(contractAddress)

  return (
    <div className="flex gap-4 bg-slate-400 rounded-lg">
      <div className="w-1/2 flex-col">
        <h1 className="text-3xl font-bold text-white">Read</h1>
        <Listbox color="primary" aria-label="funtion">
          {functionsData
            ?.filter((fn: any) => fn.state_mutability === 'view')
            ?.map((fn: any) => {
              return (
                <ListboxItem
                  key={fn.name}
                  className="cursor-pointer border-spacing-1"
                  onClick={() => onSelect(fn)}
                >
                  {fn.name}
                </ListboxItem>
              )
            })}
        </Listbox>
      </div>
      <div className="w-1/2">
        <h1 className="text-3xl font-bold text-white">Write</h1>
        <Listbox color="primary" aria-label="funtion">
          {functionsData
            ?.filter((fn: any) => fn.state_mutability === 'external')
            ?.map((fn: any,) => {
              return (
                <ListboxItem
                  key={fn.name}
                  className="cursor-pointer border-spacing-1"
                  onClick={() => onSelect(fn)}
                >
                  {fn.name}
                </ListboxItem>
              )
            })}
        </Listbox>
      </div>
    </div>
  )
}
