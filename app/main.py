from fastapi import FastAPI

from .internal import admin
from .routers import login

app = FastAPI()
app.include_router(login.router)
app.include_router(admin.router, prefix="/admin")


@app.get("/")
def root():
    return {"message": "hello there!"}
