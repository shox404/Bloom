"use client";

// import Loader from "@/app/_components/loader";
// import Box from "./dashboard-blocks/box";
// import Products from "./dashboard-blocks/products";
import { Text } from "@/app/_styles/texts";
// import { ProductFilled } from "@ant-design/icons";
import { useAppSelector } from "@/app/_lib/hooks";
// import { useGetItemQuery } from "../_store/services/items";

export default function Dashboard() {
  const { products } = useAppSelector((state) => state);

  const itmLen = products.products.length;

  // useGetItemQuery();

  return (
    // <Loader is={false}>
    <main>
      <Text>Dashboard</Text>
      <div className="boxes">
        {/* <Box
            icon={<ProductFilled />}
            title={`${itmLen} product${itmLen <= 1 ? "" : "s"}`}
            text="All shop items"
          />
          <Box
            icon={<ProductFilled />}
            title={`${itmLen} product${itmLen <= 1 ? "" : "s"}`}
            text="Sold products today"
          />
          <Box
            icon={<ProductFilled />}
            title={`${itmLen} product${itmLen <= 1 ? "" : "s"}`}
            text="All shop items"
          /> */}
      </div>
      <div className="blocks">{/* <Products /> */}</div>
    </main>
    // </Loader>
  );
}
