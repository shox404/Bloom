"use client";

import FormItem from "@/app/_components/form-item";
import { useAppDispatch, useAppSelector } from "@/app/_lib/hooks";
import { CLEAR_PRODUCT, EQUAL_PRODUCT } from "@/app/_lib/reducers/products";
import { useCreateProductMutation } from "@/app/_lib/services/products";
import { Styles } from "@/app/_styles/admin/create";
import {
  AppButton,
  AppInput,
  AppSelect,
  AppTextArea,
  Navbar,
} from "@/app/_styles/ui/element";
import { Text, Title } from "@/app/_styles/ui/text";
import { Detail, FormValue } from "@/app/global/types";
import { categoryOptions, errorMsg } from "@/app/global/utils";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form, message, Upload, UploadProps } from "antd";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useGetCategoryQuery } from "@/app/_lib/services/category";
import ImageUpload from "@/app/_components/uploader";

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "/api/upload/items",
  maxCount: 3,
  listType: "picture",
};

export default function Create() {
  const dispatch = useAppDispatch();
  const {
    products: { product },
    category: { category },
  } = useAppSelector((state) => state);
  const [create, { isLoading, error }] = useCreateProductMutation();
  const router = useRouter();

  useGetCategoryQuery();

  useEffect(() => errorMsg(error), [error]);

  const submit = async () => {
    // if (products.images !== undefined) {
    //   await create(products)
    //     .unwrap()
    //     .then(() => {
    //       router.push("/admin/products");
    //       dispatch(CLEAR_PRODUCT());
    //     });
    // } else {
    //   message.warning("Please upload images");
    // }
  };

  const setValue = (e: Detail) => dispatch(EQUAL_PRODUCT(e));

  const upload = (info: any) => {
    // const { status, name } = info.file;
    // if (status === "done") {
    //   message.success(`${name} file uploaded successfully.`);
    //   setValue({
    //     key: "images",
    //     value: info.fileList.map((e: any) => e.response),
    //   });
    // } else if (status === "removed" && info.fileList.length < 1) {
    //   setValue({ key: "images", value: undefined });
    // } else if (status === "error") {
    //   message.error(`${name} file upload failed.`);
    // }
  };

  return (
    <Fragment>
      <Navbar>
        <Text>Create</Text>
      </Navbar>
      <Styles>
        <div className="content">
          <Title>New product</Title>
          <br />
          {/* <Upload.Dragger
            {...props}
            onChange={upload}
            defaultFileList={product.image}
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
          </Upload.Dragger> */}
          <ImageUpload/>
          <br />
          <Form
            layout="vertical"
            onFinish={submit}
            onChange={({ target: { id, value } }: FormValue) =>
              setValue({ key: id, value })
            }
            // initialValues={item}
          >
            <FormItem node={<AppInput />} name="title" />
            <FormItem
              node={
                <AppSelect
                  options={categoryOptions(category)}
                  // onChange={(e) => setValue({ key: "category", value: e })}
                />
              }
              name="category"
            />
            <FormItem
              node={<AppInput type="number" prefix="$" min={0} />}
              name="price"
            />
            <FormItem
              node={
                <AppButton disabled={isLoading}>
                  {isLoading ? <LoadingOutlined /> : ""} Submit
                </AppButton>
              }
            />
          </Form>
        </div>
      </Styles>
    </Fragment>
  );
}
