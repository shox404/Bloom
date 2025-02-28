"use client";

import AppImage from "../_components/image";
import MainNavbar from "../_components/navbar";
import Tooltip from "../_components/tooltip";
import Counter from "../_components/counter";
import { CartStyles } from "../_styles/cart";
import { motion } from "framer-motion";
import { Text } from "../_styles/texts";
import { Br, Inline } from "../_styles/elements";
import { format } from "../utils";
import { useAppSelector } from "../_lib/hooks";

export default function Cart() {
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <CartStyles>
      <MainNavbar />
      <div className="products">
        {cart.map((product, index) => (
          <motion.div
            className="card"
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="image">
              <AppImage image={product.image} />
            </div>
            <div className="footer">
              <div>
                <Text>
                  <Tooltip>{product.title}</Tooltip>
                </Text>
                <Br px={5} />
                <Inline y="center">
                  <Text>Price</Text>
                  <Text> $ {format(product.price * 1)}</Text>
                </Inline>
              </div>
              <Counter />
            </div>
            <hr />
          </motion.div>
        ))}
      </div>
    </CartStyles>
  );
}
