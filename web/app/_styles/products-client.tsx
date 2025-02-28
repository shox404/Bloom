import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const ProductsStyles = styled(motion.div)`
  padding: 20px;
  background-color: #ebeaef;
  min-height: 100dvh;
  .products {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: start;
    gap: 10px;
    .card {
      width: 200px;
      background-color: #fff;
      border-radius: 20px;
      padding: 5px;
      .image {
        border-radius: 16px;
        .ant-image {
          min-width: 100%;
          border-radius: 16px;
          overflow: hidden;
          .inner-image {
            height: 100px;
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
        p {
          white-space: nowrap;
          max-width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-inline: 5px;
        }
        button {
          padding: 10px;
          height: 40px;
          width: 100%;
          font-size: 13px;
          border-radius: 16px;
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
    padding: 10px;
    .products {
      padding-inline: 0;
      .card {
        width: calc(50% - 10px);
        .image .inner-image {
          height: 200px;
        }
      }
    }
  }
`;
