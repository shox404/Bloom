import styled from "@emotion/styled";

export const Main = styled.main`
  background-color: #ebeaef;
  min-height: 100dvh;
  padding: 10px;
  .blocks {
    margin-block: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;

export const CategoryCard = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e3e3e3;
  transition: 0.2s;
  padding: 5px;
  display: flex;
  flex-direction: column;
  img {
    border-radius: 1.7rem;
  }
  .title {
    font-weight: 700;
    font-size: 15px;
    width: 100%;
    height: 50px;
    border-radius: 1.7rem;
    background-color: #ffe1e1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
