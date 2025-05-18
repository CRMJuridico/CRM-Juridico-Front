export enum TipoUsuario {
  ADMIN = 'ADMIN',
  ADVOGADO = 'ADVOGADO',
  ESTAGIARIO = 'ESTAGIARIO',
  FINANCEIRO = 'FINANCEIRO',
  SECRETARIO = 'SECRETARIO',
}

export interface Usuario {
  id: string;
  nomeCompleto: string;
  apelido: string;
  email: string;
  telefone?: string;
  cpf?: string;
  tipoUsuario: TipoUsuario;
  ativo: boolean;
  recebeNotificacoes: boolean;
  cargo?: string;
  fotoUrl?: string;
  permissoes: string[];
  criadoEm: Date;
  criadoPor: string;
  atualizadoEm?: Date;
  atualizadoPor?: string;
  ultimoLogin?: Date;
  excluidoEm?: Date;
} 