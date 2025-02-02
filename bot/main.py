import asyncio
from aiogram import Bot, Dispatcher
from config import BOT_TOKEN
from handlers import register_routes
from config import WEB_APP_URL

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


async def set_web_app_button():
    menu_button = {
        "type": "web_app",
        "text": "Open App",
        "web_app": {"url": WEB_APP_URL},
    }
    await bot.set_chat_menu_button(menu_button=menu_button)


async def main():
    await register_routes(dp)
    await set_web_app_button()
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
