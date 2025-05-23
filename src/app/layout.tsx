import './globals.css';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/providers/theme-provider';
import AuthProvider from '@/providers/auth-provider';
import { DateProvider } from '@/providers/date-provider';
import type { Metadata } from 'next';
import { PageTitleProvider } from '@/contexts/PageTitleContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Legal CRM',
  description: 'Sistema de gerenciamento de processos jurídicos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <ThemeRegistry>
            <DateProvider>
              <PageTitleProvider>
                {children}
              </PageTitleProvider>
            </DateProvider>
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
