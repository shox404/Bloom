"use client";

import { FormEvent, useState } from "react";
import { SignStyles } from "../styles/sign-styles";
import { getUserByPhone } from "../firebase/functions";
import { User } from "../types";
import { sendOtp } from "../utils/tg-function";
import { useSignUserMutation } from "../lib/services/users";

export default function Sign() {
  const [state, setState] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [signUser] = useSignUserMutation();

  const finish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = (await getUserByPhone(state)) as User;
    await sendOtp(user);
  };

  const otpFinish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = (await getUserByPhone(state)) as User;

    if (user.otp == otp) {
      await signUser(user);
    }
  };

  return (
    <SignStyles>
      <form onSubmit={finish}>
        <input type="text" onChange={(e) => setState(e.target.value)} />
        <button type="submit">submit</button>
      </form>
      <form onSubmit={otpFinish}>
        <input type="text" onChange={(e) => setOtp(e.target.value)} />
        <button type="submit">submit</button>
      </form>
    </SignStyles>
  );
}
