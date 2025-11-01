import asyncio
from io import BytesIO
from typing import BinaryIO
from PIL import Image
from async_storages import StorageImage

from app.models import User


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


async def process_user_avatar_url(user: User) -> User:
    """
    Asynchronously converts the `StorageImage` object in `user.avatar_url`
    to its string path representation if it exists.
    """
    if avatar_type := user.avatar_url:
        # if user.avatar_url is not None and DB processed instance
        if isinstance(avatar_type, StorageImage):
            user.avatar_url = await avatar_type.get_path()
    # return modified user object
    return user
