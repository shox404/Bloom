"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { SignStyles } from "../_styles/sign-styles";
import { getUserByPhone } from "../firebase/functions";
import { User } from "../types";
import { sendCode } from "../_utils/tg-functions";
import {
  useGetUserByPhoneQuery,
  useSignUserMutation,
} from "../_lib/services/users";
import { AppButton, AppForm, AppInput } from "../_styles/form";
import { Addition, Label, OneLine } from "../_styles/elements";
import { formatCode, formatPhoneNumber } from "../_utils/functions";
import { motion } from "framer-motion";
import { useAppSelector } from "../_lib/hooks";
import { useRouter } from "next/navigation";

type State = { phoneNumber: string; code: string; showCodeForm: boolean };

export default function Sign() {
  const [state, setState] = useState<State>({
    phoneNumber: "",
    code: "",
    showCodeForm: false,
  });
  const { user } = useAppSelector((state) => state.users);
  const [signUser] = useSignUserMutation();
  const router = useRouter();

  const setPhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setState((p) => ({
      ...p,
      phoneNumber: formatPhoneNumber(event.target.value),
    }));
  };

  const setDigitCode = (event: ChangeEvent<HTMLInputElement>) => {
    setState((p) => ({ ...p, code: formatCode(event.target.value) }));
  };

  const toggleCodeForm = () => {
    setState((e) => ({ ...e, showCodeForm: !e.showCodeForm }));
  };

  const sign = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = (await getUserByPhone(state.phoneNumber)) as User;
    const answer = await sendCode(user);
    if (answer) toggleCodeForm();
  };

  const checkCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = (await getUserByPhone(state.phoneNumber)) as User;
    if (user.code == state.code.split(" ").join("")) {
      await signUser(user).then(() => {
        router.push("/");
      });
    }
  };

  return (
    <SignStyles>
      <motion.div
        animate={state.showCodeForm ? { scale: [1, 1.1, 0] } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <AppForm onSubmit={sign}>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <OneLine>
            <Addition>+998</Addition>
            <AppInput
              id="phoneNumber"
              text="center"
              maxLength={12}
              onChange={setPhoneNumber}
              value={state.phoneNumber}
              required
            />
          </OneLine>
          <AppButton type="submit">Submit</AppButton>
        </AppForm>
      </motion.div>
      <motion.div
        initial={{ scale: 0, position: "absolute" }}
        animate={state.showCodeForm ? { scale: [0, 1.1, 1] } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <AppForm onSubmit={checkCode}>
          <Label htmlFor="code">6 Digit Code.</Label>
          <OneLine>
            <AppInput
              id="code"
              text="center"
              maxLength={7}
              onChange={setDigitCode}
              value={state.code}
              required
            />
          </OneLine>
          <AppButton type="submit">Submit</AppButton>
        </AppForm>
      </motion.div>
    </SignStyles>
  );
}
