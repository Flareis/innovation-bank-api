from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import ideas

app = FastAPI(title="Innovation Bank API")

app.include_router(ideas.router, prefix="/ideas", tags=["ideas"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ideas.router, prefix="/ideas", tags=["ideas"])
