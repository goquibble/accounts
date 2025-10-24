dev:
	uvicorn app.main:app --reload

alembic-upgrade:
	alembic upgrade head
