'use client';

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useTheme as useMuiTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@/providers/theme-provider';
import { usePathname, useRouter } from 'next/navigation';
import { ItemSidebarAberto } from '@/components/Menu/ItemSidebarAberto';
import { ItemSidebarFechado } from '@/components/Menu/ItemSidebarFechado';
import { IMenuBludata } from '@/interfaces/Menu';
import { DRAWER_WIDTH, CLOSED_DRAWER_WIDTH, HEADER_HEIGHT, TRANSITION_DURATION } from '@/config/layout.constants';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems: IMenuBludata[] = [
  { 
    id: 1,
    nome: 'Agenda',
    icone: <CalendarTodayIcon />,
    caminho: '/agenda',
    readonly: false,
    filhos: []
  },
  { 
    id: 2,
    nome: 'Clientes',
    icone: <PersonIcon />,
    caminho: '/clientes',
    readonly: false,
    filhos: []
  },
  { 
    id: 3,
    nome: 'Dashboard',
    icone: <DashboardIcon />,
    caminho: '/dashboard',
    readonly: false,
    filhos: []
  },
  { 
    id: 4,
    nome: 'Processos',
    icone: <FolderIcon />,
    caminho: '/processos',
    readonly: false,
    filhos: []
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const muiTheme = useMuiTheme();
  const { isDarkMode } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [menuFechadoAberto, setMenuFechadoAberto] = useState<number>(0);
  const [menuAberto, setMenuAberto] = useState<number>(0);
  const [isDrag, setIsDrag] = useState(false);

  const handleColorItens = (menu: IMenuBludata) => {
    if (menu.readonly) return muiTheme.palette.error.main;
    if (pathname === menu.caminho) return muiTheme.palette.primary.main;
    return muiTheme.palette.text.primary;
  };

  const isOpen = (id?: number) => {
    return id ? menuAberto === id : false;
  };

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
            duration: open ? TRANSITION_DURATION.enteringScreen : TRANSITION_DURATION.leavingScreen,
          }),
        },
      }}
      open={true}
    >
      <Box
        sx={{
          overflow: 'hidden',
          mt: HEADER_HEIGHT / 8,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
          }}
        >
          {open && (
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: muiTheme.palette.primary.main,
              }}
            >

            </Typography>
          )}
          <IconButton onClick={onClose} size="small">
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>

        <Box component="ul" sx={{ width: '100%', px: 1, flex: 1, listStyle: 'none', m: 0, p: 0 }}>
          {menuItems.map(menu => (
            open ? (
              <ItemSidebarAberto
                key={menu.id}
                menu={menu}
                menuAberto={menuAberto === menu.id}
                open={(id: number) => setMenuAberto(id)}
                navigate={router.push}
                openSidebar={open}
                setIsDrag={setIsDrag}
                corhover={isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}
                itemMenuAtivoBackground={isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'}
                borderRaidus="4px"
                border="2px solid transparent"
                handleColorItens={handleColorItens}
                corIcone={muiTheme.palette.text.secondary}
                corPrimaria={muiTheme.palette.primary.main}
                isOpen={isOpen}
                marginLeft={0}
                shadow={`0px 2px 4px -1px ${muiTheme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)'}`}
                backGroundColorMenuFechado={muiTheme.palette.background.paper}
                corBorda={muiTheme.palette.divider}
              />
            ) : (
              <ItemSidebarFechado
                key={menu.id}
                menu={menu}
                menuFechadoAberto={menuFechadoAberto}
                abrirMenuFechado={(id: number) => setMenuFechadoAberto(id)}
                navigate={router.push}
                corhover={isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}
                itemMenuAtivoBackground={isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'}
                borderRaidus="4px"
                handleColorItens={handleColorItens}
                corIcone={muiTheme.palette.text.secondary}
                corPrimaria={muiTheme.palette.primary.main}
                backGroundColorMenuFechado={muiTheme.palette.background.paper}
                shadow={`0px 2px 4px -1px ${muiTheme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)'}`}
                isOpen={isOpen}
                open={(id: number) => setMenuAberto(id)}
                marginLeft={0}
                openSidebar={open}
                corBorda={muiTheme.palette.divider}
              />
            )
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
