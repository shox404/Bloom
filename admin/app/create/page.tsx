"use client";

import { useAppDispatch, useAppSelector } from "@/app/_lib/hooks";
import { CLEAR_PRODUCT, EQUAL_PRODUCT } from "@/app/_lib/reducers/products";
import { useCreateProductMutation } from "@/app/_lib/services/products";
import { CreateStyle } from "@/app/_styles/create";
import { AppButton, AppForm, AppInput, AppSelect } from "@/app/_styles/form";
import { Title } from "@/app/_styles/texts";
import { Detail } from "@/app/types";
import { categoryOptions, errorMsg } from "@/app/_utils";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form, message, Upload, UploadProps } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useEffect } from "react";
import { useGetCategoryQuery } from "@/app/_lib/services/categories";

const props: UploadProps = {
  name: "file",
  action: "/api/upload/items",
  listType: "picture",
};

export default function Create() {
  const dispatch = useAppDispatch();
  const {
    products: { product },
    categories: { category },
  } = useAppSelector((state) => state);
  const [create, { isLoading, error }] = useCreateProductMutation();
  const router = useRouter();

  useGetCategoryQuery();

  useEffect(() => errorMsg(error), [error]);

  const submit = async () => {
    if (product.image !== undefined) {
      await create(product)
        .unwrap()
        .then(() => {
          router.push("/admin/products");
          dispatch(CLEAR_PRODUCT());
        });
    } else {
      message.warning("Please upload image");
    }
  };

  const setValue = (
    event: ChangeEvent<HTMLInputElement> | { target: Detail }
  ) => {
    dispatch(EQUAL_PRODUCT(event.target));
  };

  const upload = (info: any) => {
    const { status, name } = info.file;
    if (status === "done") {
      message.success(`${name} file uploaded successfully.`);
      setValue({
        target: {
          name: "image",
          value: info.fileList.map((e: any) => e.response),
        },
      });
    } else if (status === "removed" && info.fileList.length < 1) {
      setValue({ target: { name: "image", value: undefined } });
    } else if (status === "error") {
      message.error(`${name} file upload failed.`);
    }
  };

  return (
    <Fragment>
      <CreateStyle>
        <Title>New item</Title>
        <br />
        <Upload.Dragger
          {...props}
          onChange={upload}
          defaultFileList={
            product.image
              ? [
                  {
                    uid: "-1",
                    name: "image.png",
                    status: "done",
                    url: product.image,
                  },
                ]
              : []
          }
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Upload.Dragger>
        <br />
        <AppForm onSubmit={submit}>
          <AppInput
            id="title"
            name="title"
            onChange={setValue}
            value={product.title}
            required
          />
          <AppSelect
            id="title"
            options={categoryOptions(category)}
            onChange={(e) =>
              setValue({ target: { name: "category", value: e } })
            }
            value={product.category}
          />
          <AppInput
            id="price"
            name="price"
            onChange={setValue}
            value={product.price}
            required
          />
          <AppButton disabled={isLoading}>
            {isLoading ? <LoadingOutlined /> : ""} Submit
          </AppButton>
        </AppForm>
      </CreateStyle>
    </Fragment>
  );
}
