import styled from "@emotion/styled";

export const Styles = styled.div`
  padding-block: 20px;
  min-height: calc(100% - 70px);
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 20px;
  form {
    border-radius: 20px;
    width: 50%;
    background-color: #ffffff;
    padding: 17px 25px 5px 25px;
    button,
    input {
      width: 100%;
    }
    button {
      margin-top: 20px;
    }
    .editBtn {
      height: 20px;
      width: 40px;
      margin-top: 0;
    }
    .form {
      label {
        height: 150px;
        margin: 0;
      }
      .inputs {
        width: 50%;
        padding: 0;
        .ant-form-item {
          margin-bottom: 0;
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    padding: 20px 0;
    flex-wrap: wrap;
    form {
      width: 100%;
    }
  }
`;
