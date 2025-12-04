import asyncio
from io import BytesIO
from typing import BinaryIO, TypeVar

from async_storages import StorageFile
from PIL import Image
from sqlmodel import SQLModel

SQLModelT = TypeVar("SQLModelT", bound=SQLModel)


async def transform_image(
    image: BinaryIO,
    output_width: int = 300,
    output_height: int = 300,
    quality: int = 75,
) -> BytesIO:
    """Resize and convert an uploaded image to a centered WEBP format."""

    def _transform():
        with Image.open(image) as im:
            im = im.resize((output_width, output_height))
            buffer = BytesIO()
            im.save(buffer, format="WEBP", quality=quality)
            buffer.seek(0)

            return buffer

    # run transformation in seperate thread
    return await asyncio.to_thread(_transform)


async def process_storage_fields(model: SQLModelT, field_names: list[str]) -> SQLModelT:
    """
    Asynchronously converts multiple `StorageFile` objects on a model
    to their public URL path (str) representations.
    """
    for field_name in field_names:
        storage_field = getattr(model, field_name, None)
        # check if storage_field exists and is instance of `StorageFile`
        if storage_field and isinstance(storage_field, StorageFile):
            path = await storage_field.get_path()
            # update field with path
            setattr(model, field_name, path)
    # return updated model object
    return model
