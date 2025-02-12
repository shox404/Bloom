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
import Loader from "./loader";

interface Props {
  imageData: (image: string) => void;
  initial: string;
  width: string;
}

export default function ImageUpload({ imageData, initial, width }: Props) {
  const fileInputRef = useRef<InputRef | HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [upload] = useUploadMutation();
  const [deleteImage] = useDeleteMutation();

  const queryId = image || initial;
  const { data } = useGetImageQuery(queryId, { skip: !queryId });

  const postImage = async (formData: FormData) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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

  return (
    <AppUpload htmlFor="uploader" width={width}>
      <AppInput
        type="file"
        accept="image/*"
        ref={fileInputRef as any}
        onChange={handleFileChange}
        id="uploader"
        disabled={loading}
      />
      <Loader is={loading}>
        {queryId && data?.msg ? (
          <AppImagePreview src={data.msg} alt="*" />
        ) : (
          <AppImagePreview src={UploadImage.src} alt="*" />
        )}
      </Loader>
    </AppUpload>
  );
}
