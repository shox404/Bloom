import axios from "axios";

export const generateOtp = (): string => {
  return Math.floor(Math.random() * 900000 + 100000).toString();
};

export const sendOtp = async (chatId: number) => {
  const botToken = process.env.NEXT_PUBLIC_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const otp = generateOtp();

  const message = {
    chat_id: chatId,
    text: `Your OTP code is: *${otp}*`,
    parse_mode: "Markdown",
  };

  await axios(url, { method: "POST", data: message });
};
