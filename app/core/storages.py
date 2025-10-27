import os
from dotenv import load_dotenv
from fastapi_storages import S3Storage

from app.core.config import settings

# load env before class init
load_dotenv()


class CustomS3Storage(S3Storage):
    AWS_S3_BUCKET_NAME: str | None = os.environ.get("AWS_S3_BUCKET_NAME")
    AWS_S3_ENDPOINT_URL: str | None = os.environ.get("AWS_S3_ENDPOINT_URL")

    AWS_S3_USE_SSL: bool = not settings.DEBUG
    AWS_DEFAULT_ACL: str = "public-read"


# global config
s3storage = CustomS3Storage()
