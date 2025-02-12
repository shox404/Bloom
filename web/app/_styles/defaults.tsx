import styled from "@emotion/styled";

export const DefaultBtn = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #000000;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  &:hover:not(:disabled) {
    background-color: #303030;
  }
  &:active:not(:disabled) {
    scale: 0.95;
    background-color: #303030;
  }
  &:disabled {
    background-color: #1b1b1b;
    color: #cacaca;
  }
`;

export const InputUi = (p: { width: number }) => `
  height: 45px;
  border-radius: 10px;
  font-size: 16px;
  background-color: #f5f5f5 !important;
  transition: 0.5s;
  width: ${p.width}px;
`;
