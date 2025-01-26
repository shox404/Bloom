import { db } from "./config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getUserByPhone = async (phoneNumber: string) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phone_number", "==", phoneNumber));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    return snapshot.docs[0].data();
  } catch {
    throw new Error("Error fetching user data from Firestore");
  }
};
