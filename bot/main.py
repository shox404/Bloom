from aiogram import Bot, Dispatcher
from config import BOT_TOKEN
import handlers
import asyncio

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
