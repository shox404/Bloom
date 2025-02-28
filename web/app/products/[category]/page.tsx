"use client";

import AppImage from "@/app/_components/image";
import Tooltip from "@/app/_components/tooltip";
import MainNavbar from "@/app/_components/navbar";
import { useAppSelector } from "@/app/_lib/hooks";
import { useGetProductByCategoryQuery } from "@/app/_lib/services/products";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Text } from "@/app/_styles/texts";
import { Br } from "@/app/_styles/elements";
import { format } from "@/app/utils";
import { ProductsStyles } from "@/app/_styles/products-client";
import { AppButton } from "@/app/_styles/form";

export default function Products() {
  const { category } = useParams();
  const { productsByCategory } = useAppSelector((state) => state.products);

  useGetProductByCategoryQuery(category);

  return (
    <ProductsStyles>
      <MainNavbar />
      <div className="products">
        {productsByCategory.map((item, index) => (
          <motion.div
            className="card"
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="images">
              <AppImage image={item.image} />
            </div>
            <div className="footer">
              <Text>
                <Tooltip>{item.title}</Tooltip>
              </Text>
              <Br px={5} />
              <Text>
                <Tooltip>$ {format(item.price)}</Tooltip>
              </Text>
              <Br px={5} />
              <AppButton>Order</AppButton>
            </div>
          </motion.div>
        ))}
      </div>
    </ProductsStyles>
  );
}
