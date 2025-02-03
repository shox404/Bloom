import { Client, Storage } from "appwrite";

const client = new Client();

export const storage = new Storage(client);

export const { APPWRITE_BUCKET_ID, APPWRITE_ENDPOINT, APPWRITE_PROJECT } =
  process.env;

client.setEndpoint(APPWRITE_ENDPOINT!).setProject(APPWRITE_PROJECT!);
