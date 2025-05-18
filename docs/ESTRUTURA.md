# Estrutura do Projeto Legal CRM

## Visão Geral
Legal CRM é um sistema de gerenciamento para escritórios de advocacia, construído com Next.js 14, Material-UI e TypeScript.

## Tecnologias Principais
- Next.js 14 (App Router)
- Material-UI (MUI)
- TypeScript
- NextAuth.js para autenticação
- Tema customizado com suporte a modo escuro

## Estrutura de Diretórios

```
projeto-next/
├── src/
│   ├── app/                    # Rotas e páginas (Next.js App Router)
│   │   ├── dashboard/         # Página do dashboard
│   │   ├── clientes/         # Módulo de clientes
│   │   └── (auth)/           # Rotas de autenticação
│   │
│   ├── components/           # Componentes React
│   │   ├── dashboard/        # Componentes específicos do dashboard
│   │   │   ├── cards/       # Cards estatísticos
│   │   │   ├── status/      # Componentes de status
│   │   │   ├── activities/  # Atividades recentes
│   │   │   └── tasks/       # Tarefas pendentes
│   │   │
│   │   ├── clientes/        # Componentes do módulo de clientes
│   │   │   └── novo/        # Componentes para cadastro de cliente
│   │   │
│   │   └── layout/          # Componentes de layout (Header, Sidebar, etc)
│   │
│   ├── contexts/            # Contextos React
│   │   └── PageTitleContext # Contexto para título dinâmico das páginas
│   │
│   ├── providers/           # Providers da aplicação
│   │   ├── theme-provider   # Provider do tema
│   │   └── auth-provider    # Provider de autenticação
│   │
│   └── theme/              # Configurações de tema
│
├── public/                 # Arquivos estáticos
└── docs/                  # Documentação
```

## Funcionalidades Implementadas

### Layout & Navegação
- [x] Layout responsivo com sidebar retrátil
- [x] Header dinâmico com título da página atual
- [x] Tema claro/escuro
- [x] Navegação entre páginas
- [x] Autenticação básica

### Dashboard
- [x] Cards estatísticos
- [x] Gráfico de status dos processos
- [x] Lista de atividades recentes
- [x] Lista de tarefas pendentes

### Módulo de Clientes
- [x] Página de cadastro de cliente com:
  - [x] Formulário de dados pessoais
  - [x] Upload de documentos
  - [x] Interface dividida em tabs
  - [x] Validações básicas

## Componentes Principais

### Layout
- **AppMain**: Componente principal que gerencia o layout
- **Header**: Cabeçalho com título dinâmico e ações
- **Sidebar**: Menu lateral retrátil
- **Footer**: Rodapé da aplicação

### Dashboard
- **StatCard**: Cards estatísticos
- **ProcessStatus**: Visualização de status
- **RecentActivities**: Lista de atividades
- **UpcomingTasks**: Lista de tarefas

### Clientes
- **FormularioCliente**: Formulário de cadastro
- **UploadArquivos**: Componente de upload de documentos

## Contextos e Providers
- **PageTitleContext**: Gerencia o título dinâmico das páginas
- **ThemeProvider**: Gerencia o tema da aplicação
- **AuthProvider**: Gerencia a autenticação

## Próximos Passos

### Melhorias Planejadas
1. Implementar integração com backend
2. Adicionar validações avançadas nos formulários
3. Implementar sistema de notificações
4. Desenvolver módulo de processos
5. Adicionar dashboard personalizado por usuário

### Funcionalidades Futuras
1. Agenda de compromissos
2. Gestão de documentos
3. Relatórios e análises
4. Integração com sistemas jurídicos
5. Chat interno

## Padrões de Desenvolvimento

### Convenções de Código
- Componentes em PascalCase
- Hooks em camelCase
- Um componente por arquivo
- Uso de TypeScript para type-safety

### Organização de Componentes
- Componentes específicos de página em suas respectivas pastas
- Componentes reutilizáveis em /components
- Contextos em /contexts
- Providers em /providers

### Estilização
- Material-UI como base
- Tema customizado
- Responsividade em todos os componentes
- Sistema de cores consistente 