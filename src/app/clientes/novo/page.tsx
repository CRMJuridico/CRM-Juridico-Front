'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Person, Upload } from '@mui/icons-material';
import { usePageTitle } from '@/contexts/PageTitleContext';
import ClienteForm from '@/views/clientes/forms/ClienteForm';
import { UploadArquivos } from '@/views/clientes/forms/UploadArquivos';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`cliente-tabpanel-${index}`}
      aria-labelledby={`cliente-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function NovoClientePage() {
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();
  const theme = useTheme();
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Cadastro de Cliente');
  }, [setTitle]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubmit = (formData: any) => {
    // TODO: Implementar a lógica de salvar o cliente
    console.log('Dados do cliente:', formData);
    router.push('/clientes');
  };

  return (
    <Box>

      <Paper>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              py: 2,
            },
          }}
        >
          <Tab
            icon={<Person />}
            label="Dados do Cliente"
            iconPosition="start"
            sx={{ minHeight: 'auto' }}
          />
          <Tab
            icon={<Upload />}
            label="Documentos"
            iconPosition="start"
            sx={{ minHeight: 'auto' }}
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <ClienteForm onSubmit={handleSubmit} />
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <UploadArquivos />
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
}
