'use client'
import { Badge } from '@/components/ui/badge'
import FunctionItem from './FuntionItem'
import React from 'react'
import { getStateMutability } from '@/utils/function'

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
    <div className="flex flex-col gap-10 w-full max-w-4xl mx-auto mt-8">
      {['Read', 'Write'].map((type) => {
        const filteredFunctions = selectFuctions.filter(
          (fn: any) =>
            getStateMutability(fn) === (type === 'Read' ? 'view' : 'external')
        )

        return (
          <div
            key={type}
            className="bg-white rounded-lg shadow-md overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-600 h-16 w-48 rounded-br-full">
              <Badge
                variant="outline"
                className="absolute top-4 left-6 bg-white text-purple-800 px-4 py-1 text-lg font-bold rounded-full shadow-sm"
              >
                {type}
              </Badge>
            </div>
            <div className="p-6 pt-20 space-y-6">
              {filteredFunctions.length > 0 ? (
                filteredFunctions.map(
                  (fn: any, index: number, array: any[]) => (
                    <React.Fragment key={index}>
                      <FunctionItem
                        fnMsg={fn}
                        onDelete={onDelete}
                        handleCallback={handleCallback}
                        response={response && response[fn?.name]}
                      />
                      {index < array.length - 1 && (
                        <hr className="border-t border-gray-200" />
                      )}
                    </React.Fragment>
                  )
                )
              ) : (
                <p className="text-gray-500 text-center">
                  No {type.toLowerCase()} functions selected. Please choose
                  functions from the left panel.
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
