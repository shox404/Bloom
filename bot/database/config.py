from appwrite.client import Client
from appwrite.services import databases, id

client = Client()

client.set_endpoint("https://cloud.appwrite.io/v1").set_project("679e69d40021e7ba17cc")

dbs = databases(client)

promise = databases.Databases.create_document(
    "679e69c2002c51f23577", "679e69d40021e7ba17cc", id.unique(), {"title": "Hamlet"}
)

print(promise)