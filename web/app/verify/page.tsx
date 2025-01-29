"use client";

import { FormEvent, useState } from "react";
import { VerifyStyles } from "../styles/verify-styles";
import { getUserByPhone } from "../firebase/functions";
import { User } from "../types";
import { sendOtp } from "../utils/tg-function";
import { generateJwtToken } from "../utils/verify-token";
import { useVerifyUserMutation } from "../lib/services/users";

export default function Verify() {
  const [state, setState] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [verifyUser] = useVerifyUserMutation();

  const finish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = (await getUserByPhone(state)) as User;
    await sendOtp(user);
  };

  const otpFinish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = (await getUserByPhone(state)) as User;
    if (user.otp == otp) {
      await verifyUser(user);
    }
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
