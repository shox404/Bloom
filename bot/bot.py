from aiogram import Bot, Dispatcher, Router
from aiogram.filters import CommandStart
from aiogram.types import (
    Message,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo,
)
from dotenv import load_dotenv
from firebase.function import add_user
from utils.saver import save
import os
import asyncio

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
WEB_APP_URL = os.getenv("WEB_APP_URL")

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

router = Router()


@router.message(CommandStart())
async def start_handler(message: Message):
    await save(message.from_user.id)
    await add_user(message.from_user)
    web_app_button = InlineKeyboardButton(
        text="Web App", web_app=WebAppInfo(url=WEB_APP_URL)
    )

    keyboard = InlineKeyboardMarkup(inline_keyboard=[[web_app_button]])

    await message.answer(
        text="Click the button to open the web app!", reply_markup=keyboard
    )


dp.include_router(router)


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
