import { readFileSync } from "fs";
import { db } from "./config";

export function get_id() {
  const id = readFileSync("C:/Users/hp/AppData/LocalLow/bloom.cafe", "utf-8");
  return eval(id);
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
