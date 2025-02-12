"use client";

import FormItem from "@/app/_components/form-item";
import { useAppDispatch, useAppSelector } from "@/app/_lib/hooks";
import { CLEAR_PRODUCT, EQUAL_PRODUCT } from "@/app/_lib/reducers/products";
import { useCreateProductMutation } from "@/app/_lib/services/products";
import { Styles } from "@/app/_styles/admin/create";
import { Navbar } from "@/app/_styles/elements";
import { AppButton, AppInput, AppSelect } from "@/app/_styles/form";
import { Text, Title } from "@/app/_styles/texts";
import { Detail, FormValue } from "@/app/global/types";
import { categoryOptions } from "@/app/global/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Form, message } from "antd";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useGetCategoryQuery } from "@/app/_lib/services/category";
import ImageUpload from "@/app/_components/uploader";

export default function Create() {
  const dispatch = useAppDispatch();
  const {
    products: { product },
    category: { category },
  } = useAppSelector((state) => state);
  const [create, { isLoading }] = useCreateProductMutation();
  const router = useRouter();

  useGetCategoryQuery();

  const submit = async () => {
    if (product.image !== "") {
      await create(product)
        .unwrap()
        .then(() => {
          router.push("/admin/products");
          dispatch(CLEAR_PRODUCT());
        });
    } else {
      message.warning("Please upload images");
    }
  };

  const setValue = (e: Detail) => dispatch(EQUAL_PRODUCT(e));

  const imageData = (image: string) => {
    setValue({ key: "image", value: image });
  };

  return (
    <Fragment>
      <Navbar>
        <Text>Create</Text>
      </Navbar>
      <Styles>
        <div className="content">
          <Form
            layout="vertical"
            onFinish={submit}
            onChange={({ target: { id, value } }: FormValue) =>
              setValue({ key: id, value })
            }
            initialValues={product}
          >
            <Flex>
              <ImageUpload
                imageData={imageData}
                initial={product.image}
                width="350px"
              />
              <Flex vertical className="inputs">
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
              </Flex>
            </Flex>
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
