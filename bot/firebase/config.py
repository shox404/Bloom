import firebase_admin
from firebase_admin import credentials, firestore

credentials = credentials.Certificate("./keys.json")
app = firebase_admin.initialize_app(credentials)

db = firestore.client(app)
