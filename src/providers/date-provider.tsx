'use client'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale'
import { ReactNode } from 'react'

interface DateProviderProps {
  children: ReactNode
}

export function DateProvider({ children }: DateProviderProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      {children}
    </LocalizationProvider>
  )
} 