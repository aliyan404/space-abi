'use client'
import { Badge } from '@/components/ui/badge'
import FunctionItem from './FuntionItem'

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
    <div>
      <div>
        <Badge variant="outline">Read</Badge>
        <div className="flex flex-col gap-10 bg-slate-400 w-full m-2 p-5 min-h-10">
          {selectFuctions
            .filter((fn: any) => fn.state_mutability === 'view')
            .map((fn: any, index: any) => {
              return (
                <FunctionItem
                  fnMsg={fn}
                  key={index}
                  onDelete={onDelete}
                  handleCallback={handleCallback}
                  response={response && response[fn?.name]}
                />
              )
            })}
        </div>
      </div>
      <div>
        <Badge variant="outline">Write</Badge>
        <div className="flex flex-col gap-10 bg-slate-400 w-full m-2 p-5 min-h-10">
          {selectFuctions
            .filter((fn: any) => fn.state_mutability === 'external')
            .map((fn: any, index: any) => {
              return (
                <FunctionItem
                  fnMsg={fn}
                  key={index}
                  onDelete={onDelete}
                  handleCallback={handleCallback}
                  response={response && response[fn?.name]}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
