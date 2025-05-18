'use client';

import AppMain from '@/layout/AppMain';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppMain>{children}</AppMain>;
} 