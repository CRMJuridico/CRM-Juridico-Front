'use client';

import { Box, IconButton, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext } from 'react';
import { usePageTitle } from '@/contexts/PageTitleContext';
import { useTheme as useCustomTheme } from '@/providers/theme-provider';
import UserMenu from '@/components/Menu/UserMenu';
import { DRAWER_WIDTH, CLOSED_DRAWER_WIDTH, HEADER_HEIGHT, TRANSITION_DURATION } from '@/config/layout.constants';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function Header({ onMenuClick, sidebarOpen }: HeaderProps) {
  const theme = useTheme();
  const { title } = usePageTitle();
  const { toggleTheme, isDarkMode } = useCustomTheme();

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: {
          xs: 0,
          sm: sidebarOpen ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH,
        },
        height: `${HEADER_HEIGHT}px`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 0,
        boxShadow: theme.shadows[3],
        transition: theme.transitions.create(['left'], {
          easing: theme.transitions.easing.sharp,
          duration: sidebarOpen ? TRANSITION_DURATION.enteringScreen : TRANSITION_DURATION.leavingScreen,
        }),
        px: 2,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          onClick={onMenuClick}
          sx={{ 
            display: { xs: 'flex', sm: 'none' }
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          component="h1"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            color: theme.palette.primary.main,
            m: 0,
          }}
        >
          {title}
        </Box>
      </Box>

      {/* Área central para atalhos - pode ser implementada depois */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {/* Aqui entrariam os atalhos */}
      </Box>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
      }}>
        <IconButton
          onClick={toggleTheme}
          size="large"
          color="inherit"
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <IconButton
          size="large"
          color="inherit"
        >
          <NotificationsIcon />
        </IconButton>

        <UserMenu />
      </Box>
    </Box>
  );
}
