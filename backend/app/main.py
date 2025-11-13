from fastapi import FastAPI
from app.api import ideas

app = FastAPI(title="Innovation Bank API")

app.include_router(ideas.router, prefix="/ideas", tags=["ideas"])
