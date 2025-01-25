from aiogram.types import ReplyKeyboardMarkup, KeyboardButton


def location_request_button():
    keyboard = ReplyKeyboardMarkup(resize_keyboard=True, one_time_keyboard=True)
    keyboard.add(KeyboardButton(text="Share Location", request_location=True))
    return keyboard


def phone_number_request_button():
    keyboard = ReplyKeyboardMarkup(resize_keyboard=True, one_time_keyboard=True)
    keyboard.add(KeyboardButton(text="Share Phone Number", request_contact=True))
    return keyboard
