"use client";

import FormItem from "@/app/_components/form-item";
import Loader from "@/app/_components/loader";
import { Divider, Dropdown, Flex, Form, List, message, Popconfirm } from "antd";
import { Styles } from "@/app/_styles/admin/settings";
import { Text, Title } from "@/app/_styles/texts";
import { AppButton, AppInput, AppPassword } from "@/app/_styles/form";
import { Navbar } from "@/app/_styles/elements";
import { AdminData, Detail, FormValue } from "@/app//types";
import { Category } from "@/app/types";
import {
  useEditAdminDataMutation,
  useGetAdminDataQuery,
} from "@/app/_lib/services/admin";
import {
  DeleteOutlined,
  EllipsisOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/app/_lib/hooks";
import { SET_VALUE } from "@/app/_lib/reducers/admin";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "@/app/_lib/services/category";
import { EMPTY_CATEGORY, SET_CATEGORY } from "@/app/_lib/reducers/category";
import CategoryEditor from "@/app/_drawers/category-editor";
import DropItem from "@/app/_components/drop-item";
import ImageUpload from "@/app/_components/uploader";

export default function Settings() {
  const dispatch = useAppDispatch();
  const adminData = useGetAdminDataQuery();
  const [edit, { isLoading }] = useEditAdminDataMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory, moreCategory] = useCreateCategoryMutation();
  const {
    admin: { data },
    category: { category, value },
  } = useAppSelector((state) => state);

  useGetCategoryQuery();

  const submit = async (value: AdminData) => {
    await edit(value).unwrap();
  };

  const submitCategory = async () => {
    if (value.image) {
      await createCategory(value)
        .unwrap()
        .then(() => dispatch(EMPTY_CATEGORY()));
    } else {
      message.warning("Upload image!");
    }
  };

  const setValue = (value: FormValue) => dispatch(SET_VALUE(value));

  const setCategoryValue = (value: Detail) => dispatch(SET_CATEGORY(value));

  const imageData = (image: string) => {
    setCategoryValue({ key: "image", value: image });
  };

  const drops = (data: Category) => {
    return [
      {
        label: <CategoryEditor data={data} />,
        key: "0",
      },
      {
        label: (
          <DropItem onClick={() => deleteCategory(data.id as string)}>
            <DeleteOutlined /> Delete
          </DropItem>
        ),
        key: "1",
      },
    ];
  };

  return (
    <Loader is={adminData.isLoading}>
      <Navbar>
        <Text>Settings</Text>
      </Navbar>
      <Styles>
        <Form
          layout="vertical"
          onFinish={submit}
          onChange={setValue}
          initialValues={data}
        >
          <Title>Edit admin data</Title>
          <br />
          <FormItem node={<AppInput />} name="name" />
          <FormItem node={<AppPassword />} name="password" isPsw />
          <FormItem
            node={
              <AppButton disabled={isLoading}>
                {isLoading ? <LoadingOutlined /> : ""} Submit
              </AppButton>
            }
          />
        </Form>
        <Form
          layout="vertical"
          onFinish={submitCategory}
          onChange={({ target: { id, value } }: FormValue) =>
            setCategoryValue({ key: id, value })
          }
          initialValues={value}
        >
          <Title>Categories</Title>
          <br />
          <Flex gap={25} className="form">
            <ImageUpload
              width="50%"
              imageData={imageData}
              initial={value.image}
            />
            <Flex vertical className="inputs">
              <FormItem node={<AppInput />} name="key" />
              <FormItem
                node={
                  <AppButton disabled={moreCategory.isLoading}>
                    {moreCategory.isLoading ? <LoadingOutlined /> : ""} Create
                  </AppButton>
                }
              />
            </Flex>
          </Flex>
          <Divider type="horizontal">List</Divider>
          <List>
            {category.map((item: Category, index) => (
              <List.Item key={index}>
                <span>
                  {index + 1}. {item.key}
                </span>
                <Dropdown menu={{ items: drops(item) }} trigger={["click"]}>
                  <AppButton className="editBtn" type="button">
                    <EllipsisOutlined />
                  </AppButton>
                </Dropdown>
              </List.Item>
            ))}
          </List>
        </Form>
      </Styles>
    </Loader>
  );
}
