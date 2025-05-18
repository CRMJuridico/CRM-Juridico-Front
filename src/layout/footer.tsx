'use client';

import { Box, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { DRAWER_WIDTH, CLOSED_DRAWER_WIDTH } from '@/config/layout.constants';

interface FooterProps {
  sidebarOpen: boolean;
}

export default function Footer({ sidebarOpen }: FooterProps) {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: {
          xs: 0,
          sm: sidebarOpen ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH,
        },
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        backdropFilter: 'blur(6px)',
        transition: theme.transitions.create(['left'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxShadow: '0px -1px 3px rgba(0, 0, 0, 0.05)',
        zIndex: theme.zIndex.appBar - 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 600 }}
          >
            Desenvolvido por
          </Typography>
        </Box>
        <Link
          href="https://www.exemplo.com.br"
          target="_blank"
          style={{ cursor: 'pointer' }}
        >
          <Box
            sx={{
              width: '120px',
              height: '35px',
              mb: '2px',
              bgcolor: theme.palette.mode === 'dark' ? 'primary.main' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: theme.palette.mode === 'dark' ? 'common.white' : 'primary.main',
              }}
            >
              LOGO
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
