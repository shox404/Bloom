import styled from "@emotion/styled";
import { Input, Select } from "antd";
import { DefaultBtn, InputUi } from "./defaults";

export const AppForm = styled.form`
  width: 300px;
  background-color: #f3f2f3;
  border-radius: 30px;
  padding: 20px;
`;

export const AppButton = styled(DefaultBtn)`
  height: 50px;
  border-radius: 10px;
  gap: 10px;
  font-size: 16px;
  padding-inline: 20px;
`;

export const IconButton = styled(DefaultBtn)`
  height: 35px;
  width: 35px;
  border-radius: 50%;
`;

export const AppInput = styled(Input)<{ width?: string }>(InputUi);

export const AppPassword = styled(Input.Password)(InputUi);

export const AppTextArea = styled(Input.TextArea)(InputUi);

export const AppSelect = styled(Select)`
  height: 45px;
  .ant-select-selector {
    font-size: 16px;
    transition: 0.5s;
    background-color: #f5f5f5 !important;
    border-radius: 10px;
  }
`;

export const AppUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  width: 300px;
  min-height: 200px;
  text-align: center;
  input {
    display: none;
  }
`;

export const AppIconButton = styled(DefaultBtn)`
  height: 35px;
  width: 35px;
  border-radius: 50%;
`;
