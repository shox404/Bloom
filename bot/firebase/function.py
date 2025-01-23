from firebase.config import db
from typing import TypedDict


class User(TypedDict):
    first_name: str
    id: int


async def add_user(user: User):
    data = {"name": user.first_name, "tg_id": user.id}
    db.collection("users").add(data)
