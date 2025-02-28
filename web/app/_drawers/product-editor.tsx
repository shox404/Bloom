"use client";

import FormItem from "@/app/_components/form-item";
import { useAppDispatch, useAppSelector } from "@/app/_lib/hooks";
import { SET_EDIT, EQUAL_EDIT } from "@/app/_lib/reducers/products";
import { useEditProductMutation } from "@/app/_lib/services/products";
import { AppInput, AppSelect } from "@/app/_styles/form";
import { Detail, FormValue } from "@/app//types";
import { categoryOptions } from "@/app/utils";
import { EditFilled } from "@ant-design/icons";
import { Drawer, Form, message } from "antd";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useGetCategoryQuery } from "@/app/_lib/services/category";
import { Product } from "../types";
import FormFooter from "@/app/_components/form-footer";
import DropItem from "../_components/drop-item";
import ImageUpload from "../_components/uploader";

export default function ItemEditor({ data }: { data: Product }) {
  const [visible, setVisible] = useState(false);
  const [editItem, { isLoading }] = useEditProductMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    products: { editProduct },
    category: { category },
  } = useAppSelector((state) => state);

  useGetCategoryQuery();

  useEffect(() => {
    dispatch(SET_EDIT(data));
  }, [data, dispatch]);

  const toggle = () => setVisible(!visible);

  const submit = async () => {
    if (editProduct.image !== undefined) {
      await editItem(editProduct)
        .unwrap()
        .then(() => {
          router.push("/admin/products");
          dispatch(
            SET_EDIT({
              title: "",
              image: "",
              price: 0,
              category: "",
              amount: 1,
            })
          );
          toggle();
        });
    } else {
      message.warning("Please upload images");
    }
  };

  const setValue = (e: Detail) => dispatch(EQUAL_EDIT(e));

  const imageData = (image: string) => {
    setValue({ key: "new_image", value: image });
  };

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
        <ImageUpload
          imageData={imageData}
          initial={editProduct.image}
          width="100%"
        />
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
        </Form>
      </Drawer>
    </Fragment>
  );
}
