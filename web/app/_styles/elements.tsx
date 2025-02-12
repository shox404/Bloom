import styled from "@emotion/styled";

export const Label = styled.label`
  font-size: 13px;
`;

export const Addition = styled.div`
  height: 40px;
  border-radius: 18px;
  padding-inline: 10px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  color: #353535;
`;

export const OneLine = styled.div`
  display: flex;
  gap: 10px;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AppImagePreview = styled.img`
  width: 100%;
  max-height: calc(200px - 10px);
  border-radius: 6px;
  object-fit: cover;
`;

export const Navbar = styled.nav`
  padding: 25px;
  border-radius: 20px;
  height: 70px;
  background-color: #fff;
  box-shadow: 0 0 10px 5px #e3e3e3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    height: 45px;
  }
  @media screen and (max-width: 480px) {
    margin-inline: 0px;
    width: 100%;
    height: auto;
    padding: 5px;
    flex-wrap: wrap;
    button,
    .ant-input-affix-wrapper {
      height: 40px;
      padding: 10px 15px;
      border-radius: 16px;
    }
    .line {
      width: 100%;
      .ant-input-affix-wrapper {
        width: 100%;
      }
    }
  }
`;

export const Inline = styled.div<{ y: "end" | "start" | "center" }>`
  display: flex;
  justify-content: space-between;
  align-items: ${(p) => p.y};
  gap: 10px;
`;

export const Br = styled.div<{ px: number }>`
  width: 100%;
  height: ${(p) => p.px}px;
`;
