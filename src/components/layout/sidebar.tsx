'use client';

import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme as useMuiTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@/providers/theme-provider';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const DRAWER_WIDTH = 200;
const CLOSED_DRAWER_WIDTH = 65;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Clientes', icon: <PersonIcon />, path: '/clientes' },
  { text: 'Processos', icon: <FolderIcon />, path: '/processos' },
  { text: 'Agenda', icon: <CalendarTodayIcon />, path: '/agenda' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const muiTheme = useMuiTheme();
  const { isDarkMode } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: muiTheme.palette.background.paper,
          color: muiTheme.palette.text.primary,
          borderRight: `1px solid ${muiTheme.palette.divider}`,
          overflowX: 'hidden',
          transition: muiTheme.transitions.create(['width'], {
            easing: muiTheme.transitions.easing.sharp,
            duration: muiTheme.transitions.duration.enteringScreen,
          }),
        },
      }}
      open={true}
    >
      <Box
        sx={{
          overflow: 'hidden',
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            px: 1,
            mb: 1,
          }}
        >
          <IconButton onClick={onClose} size="small">
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>

        <List sx={{ width: '100%' }}>
          {menuItems.map(item => {
            const isActive = pathname === item.path;
            return (
              <Tooltip title={!open ? item.text : ''} placement="right" key={item.text}>
                <ListItem
                  button
                  onClick={() => router.push(item.path)}
                  sx={{
                    mb: 0.5,
                    mx: 1,
                    borderRadius: 1,
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    backgroundColor: isActive
                      ? isDarkMode
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.04)'
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: isDarkMode
                        ? 'rgba(255, 255, 255, 0.12)'
                        : 'rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive
                        ? muiTheme.palette.primary.main
                        : muiTheme.palette.text.secondary,
                      minWidth: 36,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.text}
                      sx={{
                        ml: -1,
                        opacity: open ? 1 : 0,
                        '& .MuiTypography-root': {
                          fontSize: '0.9rem',
                          color: isActive
                            ? muiTheme.palette.primary.main
                            : muiTheme.palette.text.primary,
                          fontWeight: isActive ? 600 : 400,
                        },
                      }}
                    />
                  )}
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
