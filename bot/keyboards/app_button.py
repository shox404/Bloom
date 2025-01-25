from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from config import WEB_APP_URL


def app_button():
    web_app_button = InlineKeyboardButton(
        text="Web App", web_app=WebAppInfo(url=WEB_APP_URL)
    )

    return InlineKeyboardMarkup(inline_keyboard=[[web_app_button]])
