'use client';

import { ReactNode } from 'react';
import ThemeRegistry from '@/providers/theme-provider';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <ThemeRegistry>{children}</ThemeRegistry>;
}
