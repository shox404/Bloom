import json
import os
from pathlib import Path


async def save(id):
    if os.name == "nt":
        file_path = Path("C:/Users/hp/AppData/LocalLow/bloom.cafe")
    else:
        home_dir = Path.home()
        file_path = home_dir / ".bloom_cafe.json"

    file_path.parent.mkdir(parents=True, exist_ok=True)

    with open(file_path, "w") as file:
        json.dump(id, file)
