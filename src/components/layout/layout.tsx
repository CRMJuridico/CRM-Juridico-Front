'use client';

import React from 'react';
import { useTheme } from '@/providers/theme-provider';
import AppMain from './AppMain';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <AppMain>{children}</AppMain>;
};

export default Layout;
