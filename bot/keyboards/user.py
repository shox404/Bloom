from aiogram.types import ReplyKeyboardMarkup, KeyboardButton


def location_request_button():
    button_row = [KeyboardButton(text="Share Location", request_location=True)]
    keyboard = ReplyKeyboardMarkup(keyboard=[button_row], resize_keyboard=True)
    return keyboard


def phone_number_request_button():
    button_row = [KeyboardButton(text="Share Phone Number", request_contact=True)]
    keyboard = ReplyKeyboardMarkup(keyboard=[button_row], resize_keyboard=True)
    return keyboard
