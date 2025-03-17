"use client";

import AppImage from "../_components/image";
import Tooltip from "../_components/tooltip";
import Counter from "../_components/counter";
import { CartNavbar } from "../_components/navbar";
import { CartStyles } from "../_styles/cart";
import { motion } from "framer-motion";
import { Text } from "../_styles/texts";
import { Br, Inline } from "../_styles/elements";
import { format } from "../utils";
import { useAppSelector } from "../_lib/hooks";
import { AppButton } from "../_styles/form";

export default function Cart() {
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <CartStyles>
      <CartNavbar />
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
              <AppImage image={product?.image} />
            </div>
            <div className="footer">
              <div>
                <Text>
                  <Tooltip>{product.title}</Tooltip>
                </Text>
                <Br px={5} />
                <Inline y="center">
                  <Text>Price</Text>
                  <Text> $ {format(product.price * product.amount)}</Text>
                </Inline>
              </div>
              <Counter id={product?.id as string} amount={product.amount} />
            </div>
            <hr />
          </motion.div>
        ))}
      </div>
      <div className="bottom">
        <Text>
          Total products {cart.reduce((acc, x) => (acc += x.amount), 0)}
        </Text>
        <AppButton>
          Order for {cart.reduce((acc, x) => (acc += x.price * x.amount), 0)} $
        </AppButton>
      </div>
    </CartStyles>
  );
}
