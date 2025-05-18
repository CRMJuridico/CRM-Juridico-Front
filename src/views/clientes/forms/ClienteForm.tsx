'use client'

import { Box, Button, TextField, Grid, Typography, Divider } from '@mui/material'
import { useState } from 'react'

interface Endereco {
  cep: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
}

interface ClienteFormData {
  // Dados Pessoais
  nome: string
  cpf: string
  rg: string
  dataNascimento: string
  email: string
  telefone: string
  celular: string
  profissao: string
  estadoCivil: string
  nacionalidade: string
  // Endereço
  endereco: Endereco
}

interface ClienteFormProps {
  onSubmit: (data: ClienteFormData) => void
  initialData?: Partial<ClienteFormData>
}

export default function ClienteForm({ onSubmit, initialData }: ClienteFormProps) {
  const [formData, setFormData] = useState<ClienteFormData>({
    nome: initialData?.nome || '',
    cpf: initialData?.cpf || '',
    rg: initialData?.rg || '',
    dataNascimento: initialData?.dataNascimento || '',
    email: initialData?.email || '',
    telefone: initialData?.telefone || '',
    celular: initialData?.celular || '',
    profissao: initialData?.profissao || '',
    estadoCivil: initialData?.estadoCivil || '',
    nacionalidade: initialData?.nacionalidade || '',
    endereco: initialData?.endereco || {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    if (name.includes('.')) {
      // Campo de endereço
      const [parent, child] = name.split('.')
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof ClienteFormData],
          [child]: value
        }
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit(formData)
  }

  // TODO: Implementar busca de CEP
  async function buscarCEP(cep: string) {
    // Implementar integração com API de CEP
  }

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        mt: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2, 
        width: '100%',
      }}
    >
      {/* Dados Pessoais */}
      <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
        Dados Pessoais
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Nome Completo"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
            fullWidth
            inputProps={{
              maxLength: 14,
              pattern: '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}'
            }}
            helperText="Formato: 000.000.000-00"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="RG"
            name="rg"
            value={formData.rg}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Data de Nascimento"
            name="dataNascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Estado Civil"
            name="estadoCivil"
            value={formData.estadoCivil}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Nacionalidade"
            name="nacionalidade"
            value={formData.nacionalidade}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Profissão"
            name="profissao"
            value={formData.profissao}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            fullWidth
            inputProps={{
              maxLength: 15,
              pattern: '\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}'
            }}
            helperText="Formato: (00) 0000-0000"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Celular"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            required
            fullWidth
            inputProps={{
              maxLength: 15,
              pattern: '\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}'
            }}
            helperText="Formato: (00) 00000-0000"
          />
        </Grid>
      </Grid>

      {/* Endereço */}
      <Typography variant="h6" color="primary" sx={{ mt: 4, mb: 2 }}>
        Endereço
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="CEP"
            name="endereco.cep"
            value={formData.endereco.cep}
            onChange={handleChange}
            required
            fullWidth
            inputProps={{
              maxLength: 9,
              pattern: '\\d{5}-\\d{3}'
            }}
            helperText="Formato: 00000-000"
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <TextField
            label="Logradouro"
            name="endereco.logradouro"
            value={formData.endereco.logradouro}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Número"
            name="endereco.numero"
            value={formData.endereco.numero}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Complemento"
            name="endereco.complemento"
            value={formData.endereco.complemento}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Bairro"
            name="endereco.bairro"
            value={formData.endereco.bairro}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Cidade"
            name="endereco.cidade"
            value={formData.endereco.cidade}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={1}>
          <TextField
            label="UF"
            name="endereco.estado"
            value={formData.endereco.estado}
            onChange={handleChange}
            required
            fullWidth
            inputProps={{
              maxLength: 2,
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          size="large"
        >
          Cadastrar Cliente
        </Button>
      </Box>
    </Box>
  )
} 