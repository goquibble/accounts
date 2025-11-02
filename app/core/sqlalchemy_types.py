from typing import Any
from async_storages.integrations.sqlalchemy import ImageType as _ImageType

from app.core.storages import storage


class ImageType(_ImageType):
    def __init__(self, *args: Any, **kwargs: Any):
        super().__init__(storage=storage, *args, **kwargs)
