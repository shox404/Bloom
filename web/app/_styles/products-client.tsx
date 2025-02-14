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
      width: 270px;
      background-color: #fff;
      border-radius: 20px;
      padding: 5px;
      .images {
        border-radius: 16px;
        .ant-image {
          min-width: 100%;
          border-radius: 16px;
          overflow: hidden;
          .image {
            height: 150px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            object-fit: cover;
            object-fit: cover;
            margin: auto;
          }
        }
      }
      .footer {
        padding: 10px;
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
    @media screen and (max-width: 480px) {
      padding-inline: 0;
      .card {
        width: 100%;
        .images .image {
          height: 200px;
        }
      }
    }
  }
`;
