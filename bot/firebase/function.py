from firebase.config import db
from typing import TypedDict


class User(TypedDict):
    first_name: str
    id: int


async def add_user(from_user: User):
    id, first_name, username = from_user.id, from_user.first_name, from_user.username

    user = db.collection("users").where("tg_id", "==", id).get()
    if not user:
        data = {"name": first_name, "tg_data": {"id": id, "username": username}}
        db.collection("users").add(data)
        return True
    else:
        return False
