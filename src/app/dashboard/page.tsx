'use client';

import { useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import { People, Assignment, CheckCircle, Schedule } from '@mui/icons-material';
import {
  StatCard,
  ProcessStatus,
  RecentActivities,
  UpcomingTasks
} from '@/components/dashboard';
import { usePageTitle } from '@/contexts/PageTitleContext';

// Mock data for demonstration
const processStatusData = [
  { status: 'Em Andamento', count: 45, color: '#2196f3' },
  { status: 'Concluídos', count: 32, color: '#4caf50' },
  { status: 'Pendentes', count: 15, color: '#ff9800' },
  { status: 'Arquivados', count: 8, color: '#9e9e9e' },
];

const recentActivities = [
  {
    id: 1,
    type: 'Processo Atualizado',
    description: 'Audiência marcada para o processo #12345',
    date: '2h atrás',
  },
  {
    id: 2,
    type: 'Novo Documento',
    description: 'Petição inicial anexada ao processo #54321',
    date: '4h atrás',
  },
  {
    id: 3,
    type: 'Status Alterado',
    description: 'Processo #98765 marcado como concluído',
    date: '1d atrás',
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: 'Audiência Preliminar',
    client: 'João Silva',
    date: '23/03/2024',
  },
  {
    id: 2,
    title: 'Prazo Contestação',
    client: 'Maria Oliveira',
    date: '25/03/2024',
  },
  {
    id: 3,
    title: 'Reunião Cliente',
    client: 'Carlos Santos',
    date: '27/03/2024',
  },
];

export default function DashboardPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Dashboard');
  }, [setTitle]);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={People} title="Clientes Ativos" value="156" color="#2196f3" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={Assignment} title="Processos Totais" value="243" color="#4caf50" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={CheckCircle} title="Concluídos" value="89" color="#ff9800" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={Schedule} title="Pendentes" value="32" color="#f44336" />
        </Grid>

        {/* Process Status */}
        <Grid item xs={12} md={6}>
          <ProcessStatus data={processStatusData} totalProcesses={100} />
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <RecentActivities activities={recentActivities} />
        </Grid>

        {/* Upcoming Tasks */}
        <Grid item xs={12}>
          <UpcomingTasks tasks={upcomingTasks} />
        </Grid>
      </Grid>
    </Container>
  );
}
