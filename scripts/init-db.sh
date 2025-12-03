#!/bin/sh
set -ex

export PGPASSWORD="$POSTGRES_PASSWORD"
# create database (ignore error if already exists)
psql -h db -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d postgres -c "CREATE DATABASE $POSTGRES_DB;" || true
