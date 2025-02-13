"use client";

import FormItem from "@/app/_components/form-item";
import { Form } from "antd";
import { Styles } from "@/app/_styles/admin/login";
import { Title } from "@/app/_styles/texts";
import { AppButton, AppInput, AppPassword } from "@/app/_styles/form";
import { AdminData } from "@/app//types";
import { useLoginAdminMutation } from "@/app/_lib/services/admin";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function Login() {
  const [login, { isLoading }] = useLoginAdminMutation();
  const router = useRouter();

  const submit = async (value: AdminData) => {
    await login(value)
      .unwrap()
      .then(() => router.push("/admin"));
  };

  return (
    <Styles>
      <Form layout="vertical" onFinish={submit}>
        <Title>Log in</Title>
        <FormItem node={<AppInput placeholder="Shoxruh" />} name="name" />
        <FormItem
          node={<AppPassword placeholder="123456" />}
          name="password"
          isPsw
        />
        <FormItem
          node={
            <AppButton disabled={isLoading}>
              {isLoading ? <LoadingOutlined /> : ""} Submit
            </AppButton>
          }
        />
      </Form>
    </Styles>
  );
}
