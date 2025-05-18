'use client';

import { useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { usePageTitle } from '@/contexts/PageTitleContext';
import { UserTableData } from '@/types/user';

// Dados mockados para exemplo
const mockUsers: UserTableData[] = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    tipo: 'Administrador',
    telefone: '(11) 99999-9999',
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria@exemplo.com',
    tipo: 'Advogado',
    telefone: '(11) 88888-8888',
  },
];

export default function UsuariosPage() {
  const router = useRouter();
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Usuários');
  }, [setTitle]);

  const handleEdit = (id: number) => {
    router.push(`/usuarios/${id}/editar`);
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete confirmation dialog and API call
    console.log('Excluir usuário:', id);
  };

  const handleAdd = () => {
    router.push('/usuarios/cadastro');
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Novo Usuário
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.tipo}</TableCell>
                  <TableCell>{user.telefone}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(user.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
} 