import styled from "@emotion/styled";

export const Styles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .content {
    border-radius: 20px;
    width: 100%;
    background-color: #ffffff;
    padding: 17px 25px 5px 25px;
    form {
      width: 100%;
      button,
      input {
        width: 100%;
      }
      button {
        margin-top: 20px;
      }
      .inputs {
        width: calc(100% - 350px);
        margin-left: 20px;
        .ant-form-item {
          input {
            width: 100%;
          }
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
    padding-inline: 0;
    .content {
      padding: 15px 25px 10px 25px;
    }
  }
`;
