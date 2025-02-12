import styled from "@emotion/styled";

export const Default = styled.p`
  font-family: sans-serif;
`;

export const Text = styled(Default)`
  font-weight: 700;
`;

export const Title = styled(Default)<{ center?: boolean }>`
  font-size: 23px;
  color: #00010f;
  text-align: ${(p) => (p.center ? "center" : "")};
`;

export const Thin = styled(Default)`
  font-size: 18px;
  color: gray;
`;
