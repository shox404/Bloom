import { readFileSync } from "fs";
import { db } from "./config";
import { homedir } from "os";
import path from "path";

export function get_id() {
  let filePath;

  if (process.platform === "win32") {
    filePath = "C:/Users/hp/AppData/LocalLow/bloom.cafe";
  } else if (process.platform === "darwin" || process.platform === "linux") {
    filePath = path.join(homedir(), ".bloom_cafe.json");
  } else if (process.platform === "android") {
    filePath = "/data/data/com.example.app/files/.bloom_cafe.json"; // Adjust path for mobile
  } else {
    throw new Error("Unsupported platform");
  }

  try {
    const id = readFileSync(filePath, "utf-8");
    return JSON.parse(id);
  } catch (error) {
    return null;
  }
}
export async function get_user(id: number) {
  const query = await db
    .collection("users")
    .where("tg_id", "==", id)
    .limit(1)
    .get();

  if (query.empty) {
    return null;
  }

  const doc = query.docs[0];

  return { id: doc.id, ...doc.data() };
}
