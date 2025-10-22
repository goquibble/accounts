from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def admin():
    return {"message": "/admin"}
