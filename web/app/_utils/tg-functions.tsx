import axios from "axios";
import { updateUserById } from "../_firebase/functions";
import { User } from "../types";

export const generateCode = (): string => {
  return Math.floor(Math.random() * 900000 + 100000).toString();
};

export const sendCode = async (user: User) => {
  const botToken = process.env.NEXT_PUBLIC_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const code = generateCode();

  const message = {
    chat_id: user?.tg_data?.id,
    text: `Your 6 digit code is: *${code}*`,
    parse_mode: "Markdown",
  };

  const data = { ...user, code };

  await updateUserById(user?.id, data);

  return await axios(url, { method: "POST", data: message })
    .then(() => true)
    .catch(() => false);
};
