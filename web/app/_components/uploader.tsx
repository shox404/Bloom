import React, { useState, useRef, useEffect } from "react";
import type { InputRef } from "antd";
import { AppButton, AppInput, AppUpload } from "../_styles/form";
import { AppImagePreview } from "../_styles/elements";
import {
  useDeleteMutation,
  useGetQuery,
  useUploadMutation,
} from "../_lib/services/upload";
import { ImageType } from "../global/types";

export default function ImageUpload() {
  const [image, setImage] = useState<ImageType>({
    id: "",
    url: "",
  });
  const fileInputRef = useRef<InputRef | HTMLInputElement | null>(null);
  const [upload] = useUploadMutation();
  const [deleteImage] = useDeleteMutation();
  const [inputKey, setInputKey] = useState(Date.now());

  const postImage = async (formData: FormData) => {
    const response = await upload(formData);
    if (response.data) {
      console.log(response.data.msg);
      setImage(response.data.msg);
    }
  };

  const removeImage = async (id: string) => {
    await deleteImage(id);
    setImage({
      id: "",
      url: "",
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      postImage(formData);
    }
  };

  const handleDelete = () => {
    removeImage(image.id);
    setImage({
      id: "",
      url: "",
    });

    if (fileInputRef.current) {
      const inputElement = fileInputRef.current as HTMLInputElement;
      inputElement.value = "";
      inputElement.form?.reset();
    }
  };

  const handleReupload = () => {
    if (fileInputRef.current) {
      if ("input" in fileInputRef.current && fileInputRef.current.input) {
        fileInputRef.current.input.click();
      } else {
        (fileInputRef.current as HTMLInputElement).click();
      }
    }
  };

  return (
    <AppUpload>
      <AppInput
        key={inputKey}
        type="file"
        accept="image/*"
        ref={fileInputRef as any}
        onChange={handleFileChange}
      />
      {image.url ? (
        <>
          <AppImagePreview src={image.url} alt="Uploaded" />
          <AppButton onClick={handleDelete}>Delete</AppButton>
        </>
      ) : null}
      <AppButton onClick={handleReupload}>Upload Image</AppButton>
    </AppUpload>
  );
}
