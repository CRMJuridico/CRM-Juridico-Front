'use client'

import { Layout } from '@/layout'
import { ReactNode } from 'react'

interface AgendaLayoutProps {
  children: ReactNode
}

export default function AgendaLayout({ children }: AgendaLayoutProps) {
  return <Layout>{children}</Layout>
} 