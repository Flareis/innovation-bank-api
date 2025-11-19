# Innovation Bank Backend

Backend em Python usando FastAPI, PostgreSQL, Docker e Clean Architecture.

## Como rodar localmente

### Com Docker Compose (Recomendado)

1. Na raiz do projeto, execute:

```bash
docker compose up --build
```

A API estará disponível em [http://localhost:8000/docs](http://localhost:8000/docs).

### Sem Docker (Ambiente Local)

1. Instale o [Poetry](https://python-poetry.org/docs/#installation).
2. Configure as variáveis de ambiente em `.env`:

```env
DATABASE_URL=postgresql+psycopg2://innovation:innovation@localhost:5432/innovation_db
```

3. Instale as dependências:

```bash
cd backend
poetry install
```

4. Execute as migrations (Alembic):

```bash
poetry run alembic upgrade head
```

5. Inicie o servidor:

```bash
poetry run uvicorn app.main:app --reload
```

## Estrutura do Projeto

```
backend/
├── app/
│   ├── api/              # Rotas da API
│   ├── core/             # Configurações e segurança
│   ├── db/               # Models e schemas
│   ├── repositories/     # Acesso aos dados
│   ├── services/         # Lógica de negócio
│   └── main.py           # Inicialização da app
├── alembic/              # Migrations do banco
```

## Endpoints Principais

- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Fazer login
- `GET /ideas` - Listar ideias
- `POST /ideas` - Criar nova ideia
- `PATCH /ideas/{id}/vote` - Votar em uma ideia

  ## Melhorias

1. Gerar JWT token
2. Vincular votos ao usuário
3. Usuário só tem permissão para votar uma vez em cada ideia
4. Inserir validações para email e senha
5. Melhorar mensagens de erros específicos
6. Usar cache para informação repetitivas
