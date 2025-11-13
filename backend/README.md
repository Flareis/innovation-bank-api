# Innovation Bank Backend

Backend em Python usando FastAPI, PostgreSQL, Docker e Clean Architecture.

## Como rodar localmente

1. Instale o [Poetry](https://python-poetry.org/docs/#installation).
2. Configure as variáveis de ambiente em `.env` (veja exemplo abaixo).
3. Execute via Docker Compose na raiz do projeto:

```bash
docker-compose up --build
```

A API estará disponível em [http://localhost:8000/docs](http://localhost:8000/docs).

## Exemplo de `.env`

```
DATABASE_URL=postgresql+psycopg2://innovation:innovation@db:5432/innovation_db
```
