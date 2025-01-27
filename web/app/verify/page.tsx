"use client";

import { FormEvent, useState } from "react";
import { VerifyStyles } from "../styles/verify-styles";
import { getUserById, getUserByPhone } from "../firebase/functions";
import { User } from "../types";
import { sendOtp } from "../utils/tg-function";

export default function Verify() {
  const [state, setState] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const finish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = (await getUserByPhone(state)) as User;
    await sendOtp(user);
  };

  const otpFinish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = (await getUserByPhone(state)) as User;

    alert(otp)
    alert(user?.otp)
  };

  return (
    <VerifyStyles>
      <form onSubmit={finish}>
        <input type="text" onChange={(e) => setState(e.target.value)} />
        <button type="submit">submit</button>
      </form>
      <form onSubmit={otpFinish}>
        <input type="text" onChange={(e) => setOtp(e.target.value)} />
        <button type="submit">submit</button>
      </form>
    </VerifyStyles>
  );
}
