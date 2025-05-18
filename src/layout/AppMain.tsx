'use client';

import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import { PageTitleProvider } from '@/contexts/PageTitleContext';

interface AppMainProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 200;
const CLOSED_DRAWER_WIDTH = 65;

const AppMain: React.FC<AppMainProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <PageTitleProvider>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Header onMenuClick={handleSidebarToggle} sidebarOpen={sidebarOpen} />
        <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 1.5, sm: 2 },
            mt: 8,
            width: {
              xs: '100%',
              sm: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH}px)`,
            },
            ml: {
              xs: 0,
              sm: sidebarOpen ? `${DRAWER_WIDTH}px` : `${CLOSED_DRAWER_WIDTH}px`,
            },
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            display: 'flex',
            flexDirection: 'column',
            minHeight: `calc(100vh - ${theme.spacing(10)})`,
            '& > *': {
              width: '100%',
              minHeight: '100%',
              '& .MuiCard-root': {
                height: '100%',
              },
              '& .MuiPaper-root': {
                height: '100%',
              }
            },
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </PageTitleProvider>
  );
};

export default AppMain;
