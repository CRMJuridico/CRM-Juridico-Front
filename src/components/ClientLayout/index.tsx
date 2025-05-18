'use client';

import { ReactNode } from 'react';
import ThemeRegistry from '@/providers/theme-provider';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeRegistry>
      <main>{children}</main>
    </ThemeRegistry>
  );
}
