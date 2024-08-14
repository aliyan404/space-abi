'use client'
import { Badge } from '@/components/ui/badge'
import FunctionItem from './FuntionItem'
import React from 'react';

export default function FunctionForm({
  selectFuctions,
  onDelete,
  handleCallback,
  response,
}: {
  selectFuctions: any
  onDelete: any
  handleCallback: any
  response: Record<string, React.ReactNode>
}) {
  return (
    <div className='flex flex-col gap-10 w-full m-2 p-8 min-h-10'>
      <div>
        <Badge variant="outline" className='bg-slate-300 w-40 h-15 text-3xl flex justify-center items-center'>Read</Badge>
        <div className="flex flex-col gap-3 bg-slate-400 w-full m-2 p-3 min-h-10 rounded-xl">
          {selectFuctions
            .filter((fn: any) => fn.state_mutability === 'view')
            .map((fn: any, index: number, array: any[]) => (
              <React.Fragment key={index}>
                <FunctionItem
                  fnMsg={fn}
                  onDelete={onDelete}
                  handleCallback={handleCallback}
                  response={response && response[fn?.name]}
                />
                {index < array.length - 1 && <hr className="border-t border-gray-300" />}
              </React.Fragment>
            ))}
        </div>
      </div>
      <div>
      <Badge variant="outline" className='bg-slate-300 w-40 h-15 text-3xl flex justify-center items-center'>Write</Badge>
        <div className="flex flex-col gap-3 bg-slate-400 w-full m-2 p-3 min-h-10 rounded-xl">
          {selectFuctions
            .filter((fn: any) => fn.state_mutability === 'external')
            .map((fn: any, index: number, array: any[]) => (
              <React.Fragment key={index}>
                <FunctionItem
                  fnMsg={fn}
                  onDelete={onDelete}
                  handleCallback={handleCallback}
                  response={response && response[fn?.name]}
                />
                {index < array.length - 1 && <hr className="border-t border-gray-300 my-4" />}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  )
}