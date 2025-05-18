export enum TipoCompromisso {
  AUDIENCIA = 'AUDIENCIA',
  REUNIAO = 'REUNIAO',
  PRAZO_PROCESSUAL = 'PRAZO_PROCESSUAL',
  TAREFA = 'TAREFA',
  OUTROS = 'OUTROS'
}

export enum PrioridadeCompromisso {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  URGENTE = 'URGENTE'
}

export enum StatusCompromisso {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO'
}

export interface Compromisso {
  id: string
  titulo: string
  descricao: string
  tipo: TipoCompromisso
  dataInicio: Date
  dataFim: Date
  prioridade: PrioridadeCompromisso
  status: StatusCompromisso
  processoId?: string // Opcional, caso esteja vinculado a um processo
  clienteId?: string // Opcional, caso esteja vinculado a um cliente
  responsaveis: string[] // IDs dos usuários responsáveis
  lembretes: Lembrete[]
  anexos?: Anexo[]
  notas?: string
  local?: string
  criadoEm: Date
  atualizadoEm: Date
}

export interface Lembrete {
  id: string
  compromissoId: string
  tempo: number // tempo em minutos antes do compromisso
  tipo: 'EMAIL' | 'NOTIFICACAO' | 'SMS'
  enviado: boolean
}

export interface Anexo {
  id: string
  nome: string
  url: string
  tipo: string
  tamanho: number
  uploadadoEm: Date
} 