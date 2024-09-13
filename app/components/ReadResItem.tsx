'use client'

import CopyBtn from '@/components/copy-btn'
import DevideBtn from '@/components/devide-btn'
import { InteractReturnType } from '@/types'
import { devideFormat, getValueType, interactSwitchRes } from '@/utils'
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
      {getValueType(result) === 'u256' ? (
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

      {getValueType(result) === 'address' && <CopyBtn value={result?.value} />}
    </>
  )
}
