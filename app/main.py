from fastapi import FastAPI
# from fastapi.staticfiles import StaticFiles

from app.internal import admin
from app.routers import login

app = FastAPI()
# app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(login.router)
app.include_router(admin.router, prefix="/admin")


@app.get("/")
def root():
    return {"message": "hello there!"}
