# Use uma imagem oficial do Python como base
FROM python:3.11-slim

# Instale o Poetry
RUN pip install poetry

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY pyproject.toml poetry.lock* ./

# Instale as dependências do projeto (sem instalar o próprio projeto como pacote)
RUN poetry install --no-root

# Copie o restante do código do backend
COPY . .

# Exponha a porta padrão do FastAPI
EXPOSE 8000

# Comando para iniciar o servidor FastAPI com reload (remova --reload em produção)
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]