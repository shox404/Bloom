import { User } from "../types";
import { db } from "./config";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const getUserById = async (id: string) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("id", "==", id));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    return snapshot.docs[0].data();
  } catch {
    throw new Error("Error fetching user data from Firestore");
  }
};

export const getUserByPhone = async (data: string) => {
  try {
    const phoneNumber = data.startsWith("998")
      ? data.split(" ").join("")
      : `998${data.split(" ").join("")}`;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phone_number", "==", phoneNumber));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    return { ...snapshot.docs[0].data(), id: snapshot.docs[0].id };
  } catch {
    throw new Error("Error fetching user data from Firestore");
  }
};

export const updateUserById = async (
  userId: string | undefined,
  updatedData: Partial<User>
): Promise<void> => {
  if (userId) {
    const userRef = doc(db, "users", userId);

    delete updatedData.id;

    await updateDoc(userRef, updatedData);
  }
};
