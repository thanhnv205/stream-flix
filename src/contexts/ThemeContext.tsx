/* eslint-disable indent */
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { BaseTheme, Theme } from '@/types'


const ThemeContext = createContext<{
  theme: Theme
  resolvedTheme: BaseTheme | null
  // eslint-disable-next-line no-unused-vars
  setTheme: (theme: Theme) => void
} | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<BaseTheme | null>(null)

  // Apply theme to document
  const applyTheme = (t: Theme) => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const finalTheme: BaseTheme = t === 'system' ? (prefersDark ? 'dark' : 'light') : t

    setResolvedTheme(finalTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(finalTheme)
  }

  const setTheme = (t: Theme) => {
    localStorage.setItem('theme', t)
    setThemeState(t)
    applyTheme(t)
  }

  // On mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const initial = stored ?? 'system'
    setThemeState(initial)
    applyTheme(initial)

    if (initial === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      const listener = () => applyTheme('system')
      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}