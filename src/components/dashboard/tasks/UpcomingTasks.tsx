import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface Task {
  id: number;
  title: string;
  client: string;
  date: string;
}

interface UpcomingTasksProps {
  tasks: Task[];
}

export const UpcomingTasks = ({ tasks }: UpcomingTasksProps) => {
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Próximas Tarefas
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tarefa</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell align="right">Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell component="th" scope="row">
                  {task.title}
                </TableCell>
                <TableCell>{task.client}</TableCell>
                <TableCell align="right">{task.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}; 