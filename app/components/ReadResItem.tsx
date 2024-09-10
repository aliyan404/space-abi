'use client'

import CopyBtn from '@/components/copy-btn'
import DevideBtn from '@/components/devide-btn'
import { InteractReturnType } from '@/types'
import { interactSwitchRes } from '@/utils'
import { devideFormat, getResType } from '@/utils/result'
import { useState } from 'react'

export default function ReadResItem({
  functionName,
  result,
}: {
  functionName: any
  result: InteractReturnType
}) {
  const [dividedItem, setDividedItem] = useState<{ [key: string]: boolean }>({})

  const handleDevide = (functionName: string) => {
    setDividedItem((prev) => ({
      ...prev,
      [functionName]: !prev[functionName],
    }))
  }

  return (
    <>
      {getResType(result) === 'u256' ? (
        <>
          {dividedItem[functionName]
            ? devideFormat(result?.value)
            : result?.value}
          <DevideBtn
            key={functionName}
            onDevide={() => handleDevide(functionName)}
            isDivided={dividedItem[functionName]}
          />
        </>
      ) : (
        interactSwitchRes(result?.type, result?.value)
      )}

      {getResType(result) === 'address' && <CopyBtn value={result?.value} />}
    </>
  )
}
