#! /usr/bin/env bash
set -ex
# run migrations
uv run alembic upgrade head
# create initial data in DB
uv run python -m app.initial_data
