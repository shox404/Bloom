"use client";

import Loader from "@/app/_components/loader";
import Box from "./dashboard-blocks/box";
import Products from "./dashboard-blocks/products";
import { Styles } from "@/app/_styles/admin/dashboard";
import { Navbar } from "@/app/_styles/elements";
import { Text } from "@/app/_styles/texts";
import { ProductFilled } from "@ant-design/icons";
import { useAppSelector } from "../_lib/hooks";
// import { useGetProductsQuery } from "../_lib/services/products";

export default function Dashboard() {
  // const { products } = useAppSelector((state) => state);

  // const itmLen = products.products.length;

  // useGetProductsQuery();

  return (
    <Loader is={false}>
      <Navbar>
        <Text>Dashboard</Text>
      </Navbar>
      <Styles>
        <div className="boxes">
          {/* <Box
            icon={<ProductFilled />}
            title={`${itmLen} product${itmLen <= 1 ? "" : "s"}`}
            text="All shop products"
          />
          <Box
            icon={<ProductFilled />}
            title={`${itmLen} product${itmLen <= 1 ? "" : "s"}`}
            text="Sold products today"
          />
          <Box
            icon={<ProductFilled />}
            title={`${itmLen} product${itmLen <= 1 ? "" : "s"}`}
            text="All shop products"
          /> */}
        </div>
        <div className="blocks">
          <Products />
        </div>
      </Styles>
    </Loader>
  );
}
