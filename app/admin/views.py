from sqladmin import ModelView
from markupsafe import Markup

from app.core.config import settings
from app.models import User


class UserAdmin(ModelView, model=User):
    name = "User"
    name_plural = "Users"
    icon = "fa-solid fa-user"

    column_searchable_list = [User.username, User.email]

    form_excluded_columns = [User.avatar_url]
    column_list = [
        User.id,
        User.email,
        User.username,
        User.avatar_url,
        User.is_active,
        User.is_superuser,
        User.is_deletion_requested,
    ]

    column_formatters = {
        "avatar_url": lambda m, a: Markup(
            f'<img src="{"https" if not settings.DEBUG else "http"}://{settings.AWS_S3_ENDPOINT_URL}/{settings.AWS_S3_BUCKET_NAME}/{m.avatar_url.name}" width="50" />'
        )
        if m.avatar_url
        else ""
    }

    column_formatters_detail = {
        "avatar_url": lambda m, a: Markup(
            f'<img src="{"https" if not settings.DEBUG else "http"}://{settings.AWS_S3_ENDPOINT_URL}/{settings.AWS_S3_BUCKET_NAME}/{m.avatar_url.name}" width="200" />'
        )
        if m.avatar_url
        else ""
    }
