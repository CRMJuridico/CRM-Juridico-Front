import { usePathname } from 'next/navigation';

export function isActiveMenu(path?: string): boolean {
  const pathname = usePathname();
  if (!path) return false;
  if (path === '/') {
    return pathname === path;
  }
  return pathname.includes(path);
} 