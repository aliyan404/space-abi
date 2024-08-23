import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingBarProps {
  progress: number
  message: string
}

export default function LoadingBar({ progress, message }: LoadingBarProps) {
  return (
    <div className="flex flex-col justify-center items-center h-64 bg-gray-50 rounded-lg shadow-inner p-6">
      <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
      <p className="text-lg font-semibold text-gray-700 mb-2">
        {message}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}
