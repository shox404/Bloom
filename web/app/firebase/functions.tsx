import { db } from "./config";

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
