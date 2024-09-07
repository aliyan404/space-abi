'use client'

import DevideBtn from '@/components/devide-btn'
import { interactSwitchRes } from '@/utils'
import { devideFormat, getResType } from '@/utils/result'
import { useState } from 'react';

export default function ResItem({ value, res }: { value: any; res: any }) {
  const [dividedItem, setDividedItem] = useState<{ [key: string]: boolean }>({})

  const handleDevide = (functionName: string) => {
    setDividedItem((prev) => ({
      ...prev,
      [functionName]: !prev[functionName],
    }))
  }

  console.log(dividedItem, 'divi')

  return (
    <div className="bg-gray-100 p-2 rounded">
      {getResType(res) === 'u256' ? (
        <>
          {dividedItem[value?.functionName]
            ? devideFormat(res?.value)
            : res?.value}
          <DevideBtn
            key={value?.functionName}
            onDevide={() => handleDevide(value?.functionName)}
            isDivided={dividedItem[value?.functionName]}
          />
        </>
      ) : (
        interactSwitchRes(res?.type, res?.value)
      )}
    </div>
  )
}
