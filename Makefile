PORT ?= 8000

server:
	uv run uvicorn app.main:app --reload --port $(PORT)

alembic-upgrade:
	uv run alembic upgrade head

alembic-downgrade:
	uv run alembic downgrade -1

alembic-revision:
	@read -p "Enter alembic revision message: " MSG; \
	uv run alembic revision --autogenerate -m "$$MSG"
