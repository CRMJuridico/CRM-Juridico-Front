'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme as useMuiTheme,
  Tooltip,
  Divider,
} from '@mui/material';
import { Menu as MenuIcon, LightMode, DarkMode, AccountCircle } from '@mui/icons-material';
import { useTheme } from '@/providers/theme-provider';
import { usePageTitle } from '@/contexts/PageTitleContext';
import LogoutModal from './LogoutModal';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

const DRAWER_WIDTH = 200;
const CLOSED_DRAWER_WIDTH = 65;

export default function Header({ onMenuClick, sidebarOpen }: HeaderProps) {
  const muiTheme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useTheme();
  const { title } = usePageTitle();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: {
            xs: '100%',
            sm: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH}px)`,
          },
          ml: {
            xs: 0,
            sm: sidebarOpen ? `${DRAWER_WIDTH}px` : `${CLOSED_DRAWER_WIDTH}px`,
          },
          backgroundColor: muiTheme.palette.background.paper,
          borderBottom: `1px solid ${muiTheme.palette.divider}`,
          transition: muiTheme.transitions.create(['margin', 'width'], {
            easing: muiTheme.transitions.easing.sharp,
            duration: muiTheme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={onMenuClick}
            sx={{
              mr: 2,
              display: { sm: 'none' },
              color: muiTheme.palette.text.primary,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: muiTheme.palette.text.primary }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}>
              <IconButton onClick={toggleTheme} sx={{ color: muiTheme.palette.text.primary }}>
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24 }} />

            <Tooltip title="Sair do Sistema">
              <IconButton
                onClick={() => setLogoutModalOpen(true)}
                sx={{
                  color: muiTheme.palette.text.primary,
                  '&:hover': {
                    color: muiTheme.palette.error.main,
                  },
                }}
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <LogoutModal open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </>
  );
}
