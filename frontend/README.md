# Innovation Bank Frontend

Frontend em React + TypeScript com Vite, shadcn-ui e Tailwind CSS.

## Requisitos

- Node.js 20+ (recomendado usar [nvm](https://github.com/nvm-sh/nvm))
- npm ou bun

## Como rodar localmente

### Com Docker Compose

Na raiz do projeto:

```bash
docker compose up
```

O frontend estará disponível em [http://localhost:3000](http://localhost:3000).

### Sem Docker (Desenvolvimento Local)

1. Navegue até a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O app abrirá em [http://localhost:5173](http://localhost:5173).

## Funcionalidades

- 🔐 Autenticação com email/senha
- 💡 Gerenciamento de ideias
- 🗳️ Sistema de votação
- ☁️ Word Cloud das ideias mais votadas
- 📱 Responsivo e moderno

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build para produção
- `npm run preview` - Visualiza build local
- `npm run lint` - Valida código com ESLint

## Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
├── contexts/        # React Context (autenticação)
├── hooks/           # Custom hooks
├── pages/           # Páginas da aplicação
├── services/        # Integração com API
├── utils/           # Funções utilitárias
└── App.tsx          # Componente raiz
```

## Variáveis de Ambiente

Crie um arquivo `.env` se necessário:

```env
VITE_API_URL=http://localhost:8000
```

## Tecnologias

- **Vite** - Build tool rápido
- **React 18** - Framework UI
- **TypeScript** - Tipagem estática
- **React Router** - Roteamento
- **shadcn-ui** - Componentes UI
- **Tailwind CSS** - Estilização
- **React Query** - Gerenciamento de estado assíncrono

## Deploy

Para fazer deploy em produção:

```bash
npm run build
# Servir a pasta 'dist' com um servidor web
```
## Melhorias

1. Adicionar tratamento para erros específicos (401, 403, 500)
2. Salvar token e vrificar expiração
3. Usar cache para informação repetitivas
