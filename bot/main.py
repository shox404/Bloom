import asyncio
from aiogram import Bot, Dispatcher
from config import BOT_TOKEN
from handlers import register_routes

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


async def main():
    await register_routes(dp)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
