from io import BytesIO
from typing import BinaryIO
from PIL import Image


def transform_image(
    upload_file: BinaryIO,
    output_width: int = 300,
    output_height: int = 300,
    quality: int = 75,
) -> BytesIO:
    with Image.open(upload_file) as image:
        width, height = image.size
        # calculate bounding box to crop
        left = max((width - output_width) // 2, 0)
        top = max((height - output_height) // 2, 0)
        right = left + output_width
        bottom = top + output_height
        # crop image
        image = image.crop((left, top, right, bottom))

        # convert to webp with quality
        buffer = BytesIO()
        image.save(buffer, format="WEBP", quality=quality)
        buffer.seek(0)

        return buffer
