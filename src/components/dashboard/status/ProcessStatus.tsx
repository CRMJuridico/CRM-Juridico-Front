import { Box, Paper, Typography } from '@mui/material';

interface ProcessStatusData {
  status: string;
  count: number;
  color: string;
}

interface ProcessStatusProps {
  data: ProcessStatusData[];
  totalProcesses: number;
}

export const ProcessStatus = ({ data, totalProcesses }: ProcessStatusProps) => {
  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Status dos Processos
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {data.map((item) => {
          const percentage = (item.count / totalProcesses) * 100;
          return (
            <Box key={item.status}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{item.status}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.count} ({percentage.toFixed(1)}%)
                </Typography>
              </Box>
              <Box sx={{ width: '100%', height: 8, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Box
                  sx={{
                    width: `${percentage}%`,
                    height: '100%',
                    bgcolor: item.color,
                    borderRadius: 1,
                    transition: 'width 0.5s ease-in-out',
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}; 