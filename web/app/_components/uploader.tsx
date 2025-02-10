import React, { useState, useRef } from "react";
import type { InputRef } from "antd";
import { AppInput, AppUpload } from "../_styles/form";
import { AppImagePreview } from "../_styles/elements";
import {
  useDeleteMutation,
  useGetImageQuery,
  useUploadMutation,
} from "../_lib/services/upload";
import UploadImage from "../_assets/upload.png";

interface Props {
  imageData: (image: string) => void;
  initial: string;
}

export default function ImageUpload({ imageData, initial }: Props) {
  const fileInputRef = useRef<InputRef | HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>("");
  const [upload] = useUploadMutation();
  const [deleteImage] = useDeleteMutation();

  const queryId = image || initial;
  const { data } = useGetImageQuery(queryId, { skip: !queryId });

  const postImage = async (formData: FormData) => {
    try {
      if (image) {
        await deleteImage(image);
        setImage("");
        imageData("");
        resetFileInput();
      }

      const response = await upload(formData);
      if (response.data?.msg) {
        imageData(response.data.msg);
        setImage(response.data.msg);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await postImage(formData);
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      const inputElement = fileInputRef.current as HTMLInputElement;
      inputElement.value = "";
      inputElement.form?.reset();
    }
  };

  const handleUploadClick = () => {
    const { current } = fileInputRef;
    if (current) {
      if ("click" in current) {
        (current as HTMLInputElement).click();
      } else if ("input" in current && current.input) {
        current.input.click();
      }
    }
  };

  return (
    <AppUpload htmlFor="uploader">
      <AppInput
        type="file"
        accept="image/*"
        ref={fileInputRef as any}
        onChange={handleFileChange}
        id="uploader"
      />
      {queryId && data?.msg && <AppImagePreview src={data.msg} alt="*" />}
      <AppImagePreview src={UploadImage.src} alt="*" />
    </AppUpload>
  );
}
