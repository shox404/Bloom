import json

async def save(id):
    file_path = "C:/Users/hp/AppData/LocalLow/bloom.cafe"
    with open(file_path, "w") as file:
        json.dump(id, file)
        