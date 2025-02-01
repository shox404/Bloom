import styled from "@emotion/styled";

export const Main = styled.main`
  background-color: #ebeaef;
  min-height: 100dvh;
  padding: 10px;
  display: flex;
  align-content: start;
  justify-content: center;
  gap: 10px;
`;

export const Card = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e7e7e7;
  transition: 0.2s;
  img {
    border-radius: 2rem;
  }
  .title {
    font-weight: 700;
    font-size: 15px;
  }
`;
