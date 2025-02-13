"use client";

import AppImage from "@/app/_components/image";
import Tooltip from "@/app/_components/tooltip";
import { useAppSelector } from "@/app/_lib/hooks";
import { useGetProductByCategoryQuery } from "@/app/_lib/services/products";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Text, Title } from "@/app/_styles/texts";
import { Br, Inline } from "@/app/_styles/elements";
import { format } from "@/app/utils";
import { ProductsStyles } from "@/app/_styles/products-client";

export default function Products() {
  const { category } = useParams();
  const { productsByCategory } = useAppSelector((state) => state.products);

  useGetProductByCategoryQuery(category);

  return (
    <ProductsStyles>
      {productsByCategory.map((item, index) => (
        <motion.div
          className="card"
          key={item.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="images">
            <AppImage image={item.image} />
          </div>
          <div className="footer">
            <Title>
              <Tooltip>{item.title}</Tooltip>
            </Title>
            <Br px={5} />
            <Inline y="center">
              <Text>Price</Text>
              <Text> $ {format(item.price)}</Text>
            </Inline>
            <Br px={5} />
            <Inline y="end">
              <Text>{item.category}</Text>
            </Inline>
          </div>
        </motion.div>
      ))}
    </ProductsStyles>
  );
}
