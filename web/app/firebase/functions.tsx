import { db } from "./config";

export async function get_user(phone_number: number | string) {
  const query = await db
    .collection("users")
    .where("phone_number", "==", phone_number)
    .get();

  if (query.empty) return null;

  const doc = query.docs[0];

  return { id: doc.id, ...doc.data() };
}
