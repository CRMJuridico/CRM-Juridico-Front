import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
} from '@mui/material';
import { CloudUpload as UploadIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Arquivo {
  id: string;
  nome: string;
  tamanho: string;
  tipo: string;
}

export const UploadArquivos: React.FC = () => {
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const novosArquivos = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        nome: file.name,
        tamanho: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        tipo: file.type,
      }));
      setArquivos([...arquivos, ...novosArquivos]);
    }
  };

  const handleDelete = (id: string) => {
    setArquivos(arquivos.filter((arquivo) => arquivo.id !== id));
  };

  return (
    <Box>
      <Box
        sx={{
          border: '2px dashed #ccc',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="arquivo-upload"
        />
        <label htmlFor="arquivo-upload">
          <Button
            component="span"
            variant="outlined"
            startIcon={<UploadIcon />}
            sx={{ mb: 2 }}
          >
            Selecionar Arquivos
          </Button>
        </label>
        <Typography variant="body2" color="text.secondary">
          Arraste os arquivos aqui ou clique para selecionar
        </Typography>
      </Box>

      {arquivos.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <List>
            {arquivos.map((arquivo) => (
              <ListItem key={arquivo.id}>
                <ListItemText
                  primary={arquivo.nome}
                  secondary={`${arquivo.tamanho} - ${arquivo.tipo}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleDelete(arquivo.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}; 