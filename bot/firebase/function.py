from firebase.config import db
from aiogram.types import Message


async def is_user_exist(id: int):
    user = db.collection("users").where("tg_data.id", "==", id).get()
    return False if not user else True


async def add_user(message: Message, state_data):
    from_user = message.from_user
    id = from_user.id
    first_name = from_user.first_name
    username = from_user.username
    location = state_data["location"]
    phone_number = state_data["phone_number"]

    user = await is_user_exist(id)
    if not user:
        data = {
            "name": first_name,
            "tg_data": {"id": id, "username": username},
            "location": {
                "latitude": location.latitude,
                "longitude": location.longitude,
            },
            "phone_number": phone_number,
        }
        db.collection("users").add(data)
