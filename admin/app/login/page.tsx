"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LoginStyle } from "../styles/login-styles";
import { useLoginAdminMutation } from "../lib/services/admin";
import { AppButton, AppForm, AppInput } from "../styles/form";
import { Label } from "../styles/elements";
import { useRouter } from "next/navigation";
import { AdminData } from "../types";
import { errorMsg } from "../utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Title } from "../styles/texts";

export default function Sign() {
  const [state, setState] = useState<AdminData>({ name: "", password: "" });
  const [login, { error, isLoading }] = useLoginAdminMutation();
  const router = useRouter();

  useEffect(() => errorMsg(error), [error]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(state)
      .unwrap()
      .then(() => router.push("/"));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((p) => ({ ...p, [event.target.name]: event.target.value }));
  };

  return (
    <LoginStyle>
      <AppForm onSubmit={submit}>
        <Title>Login</Title>
        <Label htmlFor="name">Name</Label>
        <AppInput
          id="name"
          name="name"
          onChange={handleChange}
          value={state.name}
          required
        />
        <Label htmlFor="password">Password</Label>
        <AppInput
          id="password"
          name="password"
          onChange={handleChange}
          value={state.password}
          required
        />
        <br />
        <br />
        <AppButton type="submit">
          {isLoading ? <LoadingOutlined /> : ""} Submit
        </AppButton>
      </AppForm>
    </LoginStyle>
  );
}
