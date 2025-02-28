import { message } from "antd";
import { Category } from "@/app/types";

export const errorMsg = (error: { data: { message: string } }) => {
  if (error) {
    if (error?.data?.message) {
      message.error(error?.data?.message);
    } else {
      message.error("Failed!");
    }
  }
};

export const categoryOptions = (array: Category[]) => {
  return array.map((e: Category) => ({
    value: e.key[0].toUpperCase() + e.key.slice(1),
  }));
};

export const format = (value: number) => Number(value).toLocaleString();

export const divider = (array: Category[]) => {
  const part = Math.ceil(array.length / 2);
  const first = array.slice(0, part);
  const second = array.slice(part, array.length);
  return [first, second];
};
