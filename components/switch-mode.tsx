'use client'
import { useTheme } from 'next-themes'
import { Switch } from './ui/switch'
import { useState } from 'react'

export default function SwitchMode() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState(theme === 'dark')

  const handleChange = (checked: boolean) => {
    setIsDark(checked)
    setTheme(checked ? 'dark' : 'light')
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch checked={isDark} onCheckedChange={handleChange} />
      <span className="text-sm font-bold">
        {isDark ? 'Drak' : 'Light'}
      </span>
    </div>
  )
}