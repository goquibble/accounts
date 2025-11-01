import asyncio
from io import BytesIO
from typing import BinaryIO
from PIL import Image

from app.core.storages import storage


async def transform_image(
    image: BinaryIO,
    output_width: int = 300,
    output_height: int = 300,
    quality: int = 75,
) -> BytesIO:
    """Crop and convert an uploaded image to a centered WEBP format."""

    def _transform():
        with Image.open(image) as im:
            width, height = im.size
            # calculate bounding box to crop
            left = max((width - output_width) // 2, 0)
            top = max((height - output_height) // 2, 0)
            right = left + output_width
            bottom = top + output_height
            # crop image
            im = im.crop((left, top, right, bottom))

            # convert to webp with quality
            buffer = BytesIO()
            im.save(buffer, format="WEBP", quality=quality)
            buffer.seek(0)

            return buffer

    # run transformation in seperate thread
    return await asyncio.to_thread(_transform)


async def upload_to_s3storage(file: BinaryIO, name: str) -> str:
    """Upload a file-like object to S3Storage and return its public URL."""
    path = await storage.upload(file, name)
    return await storage.get_path(path)
