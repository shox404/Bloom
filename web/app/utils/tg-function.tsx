import { get_user } from "../firebase/functions";

export const ddd = (value: any) => {
  get_user(value)
};
