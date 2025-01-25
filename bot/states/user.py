from aiogram.filters.state import State, StatesGroup


class User(StatesGroup):
    location = State()
    phone_number = State()
