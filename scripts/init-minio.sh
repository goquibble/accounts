#!/bin/sh
set -ex
# script to run inside container to make minIO bucket public
mc alias set local http://minio:9000 "$AWS_ACCESS_KEY_ID" "$AWS_SECRET_ACCESS_KEY"
mc mb -p local/"$AWS_S3_BUCKET_NAME" || true
mc anonymous set public local/"$AWS_S3_BUCKET_NAME"
