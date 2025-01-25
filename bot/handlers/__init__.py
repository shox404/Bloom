from aiogram import Dispatcher

from handlers.start import start


async def register_routes(dp: Dispatcher):
    dp.include_router(start)
