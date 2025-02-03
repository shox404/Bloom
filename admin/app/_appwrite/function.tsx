import { ID } from "appwrite";
import { storage } from "./config";

export const saveImage = async (fileInputId: string) => {
  const uploader = document.getElementById(fileInputId) as HTMLInputElement;

  if (!uploader?.files?.length) {
    console.error("No file selected.");
    return;
  }

  try {
    const file = uploader.files[0];
    const response = await storage.createFile(
      "679f09690013e0e294d5",
      ID.unique(),
      file
    );
    console.log("File uploaded:", response);
    return response;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

export const getImage = (fileId: string) => {
  try {
    const fileUrl = storage.getFileView("679f09690013e0e294d5", fileId);
    console.log("File URL:", fileUrl);
    return fileUrl;
  } catch (error) {
    console.error("Failed to get file:", error);
  }
};
