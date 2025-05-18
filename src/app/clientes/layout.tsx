'use client';

import { Layout } from '@/components/layout';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}
