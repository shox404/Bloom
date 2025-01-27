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

export const updateUserById = async (
  userId: string,
  updatedData: Partial<User>
): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, updatedData);

    console.log("User updated successfully");
  } catch (error) {
    console.error("Error updating user data:", error);
    throw new Error("Error updating user data");
  }
};
