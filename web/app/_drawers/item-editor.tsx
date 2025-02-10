"use client";

import FormItem from "@/app/_components/form-item";
import { useAppDispatch, useAppSelector } from "@/app/_lib/hooks";
import { SET_EDIT, EQUAL_EDIT } from "@/app/_lib/reducers/products";
import { useEditProductMutation } from "@/app/_lib/services/products";
import { AppInput, AppSelect, AppTextArea } from "@/app/_styles/form";
import { Detail, FormValue, Item } from "@/app/global/types";
import { errorMsg, categoryOptions } from "@/app/global/utils";
import { EditFilled, InboxOutlined } from "@ant-design/icons";
import { Drawer, Form, message, Upload, UploadProps } from "antd";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useGetCategoryQuery } from "@/app/_lib/services/category";
import { Product } from "../types";
import FormFooter from "@/app/_components/form-footer";
import DropItem from "../_components/drop-item";

export default function ItemEditor({ data }: { data: Product }) {
  const [visible, setVisible] = useState(false);
  const [editItem, { isLoading, error }] = useEditProductMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    products: { editProduct },
    category: { category },
  } = useAppSelector((state) => state);

  useGetCategoryQuery();

  useEffect(() => {
    dispatch(SET_EDIT(data));
  }, [data]);

  useEffect(() => errorMsg(error), [error]);

  const toggle = () => setVisible(!visible);

  const submit = async () => {
    if (editProduct.image !== undefined) {
      await editItem(editProduct)
        .unwrap()
        .then(() => {
          router.push("/admin/products");
          dispatch(SET_EDIT({}));
          toggle();
        });
    } else {
      message.warning("Please upload images");
    }
  };

  const setValue = (e: Detail) => dispatch(EQUAL_EDIT(e));

  return (
    <Fragment>
      <DropItem onClick={toggle}>
        <EditFilled /> Edit
      </DropItem>
      <Drawer
        title="Edit Item"
        onClose={toggle}
        open={visible}
        footer={<FormFooter act={submit} hide={toggle} loading={isLoading} />}
      >
        {/* <Upload.Dragger
          {...uploadProps}
          onChange={upload}
          defaultFileList={editProduct.image}
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
        <br />
        <Form
          layout="vertical"
          onFinish={submit}
          onChange={({ target: { id, value } }: FormValue) =>
            setValue({ key: id, value })
          }
          initialValues={editProduct}
        >
          <FormItem node={<AppInput />} name="title" />
          <FormItem
            node={
              <AppSelect
                options={categoryOptions(category)}
                onChange={(e) => setValue({ key: "category", value: e })}
              />
            }
            name="category"
          />
          <FormItem
            node={<AppInput type="number" prefix="$" min={0} />}
            name="price"
          />
          <FormItem node={<AppInput type="number" min={1} />} name="amount" />
          <FormItem node={<AppTextArea />} name="description" />
        </Form>
      </Drawer>
    </Fragment>
  );
}
