import axios from "axios";
import { updateUserById } from "../firebase/functions";
import { User } from "../types";

export const generateOtp = (): string => {
  return Math.floor(Math.random() * 900000 + 100000).toString();
};

export const sendOtp = async (user: User) => {
  const botToken = process.env.NEXT_PUBLIC_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const otp = generateOtp();

  const message = {
    chat_id: user.tg_data.id,
    text: `Your OTP code is: *${otp}*`,
    parse_mode: "Markdown",
  };

  const data = { ...user, otp };

  await updateUserById(user.id!, data);

  await axios(url, { method: "POST", data: message });
};
