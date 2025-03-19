from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.types import Message
from aiogram.fsm.context import FSMContext
from firebase.function import add_user, is_user_exist
from keyboards.app_button import app_button
from states.user import User
from keyboards.user import location_request_button, phone_number_request_button
from config import WEB_APP_URL

start = Router()

# async def set_web_app_button():
#     menu_button = {
#         "type": "web_app",
#         "text": "Open App",
#         "web_app": {"url": WEB_APP_URL},
#     }
#     await bot.set_chat_menu_button(menu_button=menu_button)


@start.message(CommandStart())
async def start_handler(message: Message, state: FSMContext):
    user_exist = await is_user_exist(message.from_user.id)
    print(f"User exist: {user_exist}")

    if user_exist:
        menu_button = {
            "type": "web_app",
            "text": "Open App",
            "web_app": {"url": WEB_APP_URL},
        }
        await message.bot.set_chat_menu_button(menu_button=menu_button)
        await message.answer(
            text="Click the button to open the web app!", reply_markup=app_button()
        )
    else:
        await state.set_state(User.location)
        await message.answer(
            text="Please share your location.", reply_markup=location_request_button()
        )



@start.message(User.location)
async def handle_location(message: Message, state: FSMContext):
    if message.location:
        await state.update_data(location=message.location)
        await state.set_state(User.phone_number)
        await message.answer(
            text="Now, please share your phone number.",
            reply_markup=phone_number_request_button(),
        )
    else:
        await message.answer("Please use the button to share your location.")


@start.message(User.phone_number)
async def handle_phone_number(message: Message, state: FSMContext):
    if message.contact:
        await state.update_data(phone_number=message.contact.phone_number)
        await message.answer(
            text="Thank you! You can now access the web app.", reply_markup=app_button()
        )

        state_data = await state.get_data()
        await add_user(message, state_data)

        await state.clear()
    else:
        await message.answer("Please use the button to share your phone number.")
