import styled from "@emotion/styled";

export const AppForm = styled.form`
  width: 300px;
  background-color: #f3f2f3;
  border-radius: 30px;
  padding: 20px;
`;

export const AppInput = styled.input<{ width?: string; text?: string }>`
  height: 40px;
  width: 250px;
  outline: none;
  border: none;
  border-radius: 18px;
  padding-inline: 10px;
  width: ${(p) => (p.width ? p.width : "100%")};
  text-align: ${(p) => (p.text ? p.text : "left")};
`;

export const AppButton = styled.button<{ width?: string }>`
  outline: none;
  border: none;
  background-color: #ed878e;
  font-weight: 900;
  color: #ffffff;
  padding-block: 10px;
  padding-inline: 30px;
  width: ${(p) => (p.width ? p.width : "100%")};
  border-radius: 18px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:active {
    transition-duration: 0.5s;
    transform: scale(0.99);
  }
`;

export const IconButton = styled.button`
  height: 35px;
  width: 35px;
  border-radius: 50%;
`;
