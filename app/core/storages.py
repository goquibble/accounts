from functools import lru_cache

from async_storages import S3Storage

from app.core.config import settings


@lru_cache
def get_storage() -> S3Storage:
    return S3Storage(
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        bucket_name=settings.AWS_S3_BUCKET_NAME,
        endpoint_url=settings.AWS_S3_ENDPOINT_URL,
        use_ssl=not settings.DEBUG,
        default_acl="public-read",
    )


# use cached result
storage = get_storage()
