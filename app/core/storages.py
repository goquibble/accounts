from functools import lru_cache
from fastapi_storages import S3Storage

from app.core.config import settings


class CustomS3Storage(S3Storage):
    AWS_ACCESS_KEY_ID: str = settings.AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY: str = settings.AWS_SECRET_ACCESS_KEY
    AWS_S3_BUCKET_NAME: str = settings.AWS_S3_BUCKET_NAME
    AWS_S3_ENDPOINT_URL: str = settings.AWS_S3_ENDPOINT_URL
    AWS_S3_USE_SSL: bool = not settings.DEBUG
    AWS_DEFAULT_ACL: str = "public-read"


@lru_cache
def get_s3storage() -> CustomS3Storage:
    return CustomS3Storage()


# use cached result
s3storage = get_s3storage()
