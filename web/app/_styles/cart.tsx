import styled from "@emotion/styled";

export const CartStyles = styled.div`
  padding: 10px;
  .products {
    margin-block: 20px;
    .card {
      margin-top: 10px;
      display: flex;
      .image {
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        .ant-image {
          width: 70px;
          border-radius: 16px;
          overflow: hidden;
          .inner-image {
            height: 70px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            object-fit: cover;
            margin: auto;
          }
        }
      }
      .footer {
        padding-left: 10px;
        display: flex;
        width: calc(100% - 70px);
        align-items: center;
        justify-content: space-between;
        p {
          white-space: nowrap;
          max-width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        button {
          padding: 10px;
          height: 35px;
        }
      }
    }
  }
`;
