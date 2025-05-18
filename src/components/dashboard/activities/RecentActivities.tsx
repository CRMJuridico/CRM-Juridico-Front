import { Box, Paper, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';

interface Activity {
  id: number;
  type: string;
  description: string;
  date: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  const getChipColor = (type: string) => {
    switch (type) {
      case 'Processo Atualizado':
        return 'info';
      case 'Novo Documento':
        return 'success';
      case 'Status Alterado':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Atividades Recentes
      </Typography>
      <List>
        {activities.map((activity) => (
          <ListItem
            key={activity.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 1,
              py: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Chip
                label={activity.type}
                color={getChipColor(activity.type)}
                size="small"
                sx={{ minWidth: 120 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                {activity.date}
              </Typography>
            </Box>
            <ListItemText
              primary={activity.description}
              sx={{ m: 0 }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 