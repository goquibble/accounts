dev:
	uv run uvicorn app.main:app --reload

alembic-upgrade:
	uv run alembic upgrade head

alembic-downgrade:
	uv run alembic downgrade -1

alembic-revision:
	@read -p "Enter alembic revision message: " MSG; \
	uv run alembic revision --autogenerate -m "$$MSG"
