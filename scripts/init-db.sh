#!/bin/sh
set -e

export PGPASSWORD="$POSTGRES_PASSWORD"

echo "Waiting for PostgreSQL at $PGHOST:$PGPORT..."
until pg_isready -h "$PGHOST" -p "$PGPORT" -U "$POSTGRES_USER"; do
  sleep 2
done

echo "Creating database (if not exists)..."
psql -h "$PGHOST" -p "$PGPORT" -U "$POSTGRES_USER" -d postgres <<EOF || true
CREATE DATABASE "$POSTGRES_DB";
EOF

echo "Init DB complete"
