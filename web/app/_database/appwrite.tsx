import { Client, Storage } from "appwrite";

const client = new Client();

export const storage = new Storage(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("679f0934001e65929f5f");
