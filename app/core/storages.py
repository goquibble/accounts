from fastapi_storages import S3Storage

from app.core.config import settings


class CustomS3Storage(S3Storage):
    AWS_DEFAULT_ACL: str = "public-read"
    AWS_S3_USE_SSL: bool = not settings.DEBUG


# global config
s3storage = CustomS3Storage()
