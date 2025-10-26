#!/bin/sh
set -ex
# create database (ignore error if already exists)
psql -h db -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d postgres -c "CREATE DATABASE $POSTGRES_DB;" || true
