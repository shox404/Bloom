from aiogram.types import ReplyKeyboardMarkup, KeyboardButton


def location_request_button():
    button_row = [KeyboardButton(text="Share Location", request_location=True)]
    return ReplyKeyboardMarkup(
        keyboard=[button_row], resize_keyboard=True, one_time_keyboard=True
    )


def phone_number_request_button():
    button_row = [KeyboardButton(text="Share Phone Number", request_contact=True)]
    return ReplyKeyboardMarkup(
        keyboard=[button_row], resize_keyboard=True, one_time_keyboard=True
    )
