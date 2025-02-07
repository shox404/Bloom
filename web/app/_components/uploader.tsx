import React, { useState } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const FileInput = styled.input`
  display: none;
`;

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReupload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Container>
      <FileInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {image ? (
        <>
          <ImagePreview src={image} alt="Uploaded" />
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleReupload}>Reupload</Button>
        </>
      ) : (
        <Button onClick={() => fileInputRef.current?.click()}>
          Upload Image
        </Button>
      )}
    </Container>
  );
}
