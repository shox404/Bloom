"use client";

import Loader from "@/app/_components/loader";
import { useAppSelector } from "@/app/_lib/hooks";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "@/app/_lib/services/products";
import { Styles } from "@/app/_styles/admin/products";
import {
  AppButton,
  AppInput,
  Br,
  Inline,
  Navbar,
} from "@/app/_styles/ui/element";
import { Text, Title } from "@/app/_styles/ui/text";
import { Product } from "@/app/types";
import {
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Dropdown, Flex, Image, Popconfirm } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { errorMsg, format } from "@/app/global/utils";
import { useRouter } from "next/navigation";
import Tooltip from "@/app/_components/tooltip";
import ItemEditor from "@/app/_drawers/item-editor";

export default function Products() {
  const { products } = useAppSelector((state) => state.products);
  const item = useGetProductQuery("d");
  const [search, setSearch] = useState("");
  const [deleteProduct, { error }] = useDeleteProductMutation();

  useEffect(() => errorMsg(error), [error]);

  const router = useRouter();

  const drops = (data: Product) => {
    return [
      {
        label: <ItemEditor data={data} />,
        key: "0",
      },
      {
        label: (
          <Popconfirm title="Delete?" onConfirm={() => deleteProduct(data?.id)}>
            <Inline y="start">
              <div>
                <DeleteOutlined /> Delete
              </div>
              .
            </Inline>
          </Popconfirm>
        ),
        key: "1",
      },
    ];
  };

  const useSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const goCreate = () => router.push("/admin/create");

  return (
    <Loader is={item.isLoading}>
      <Navbar>
        <Text>Products</Text>
        <Flex gap={10} className="line">
          <AppInput
            prefix={<SearchOutlined />}
            placeholder="Search"
            width={200}
            onChange={useSearch}
            className="input"
          />
          <AppButton onClick={goCreate}>
            Create <PlusOutlined />
          </AppButton>
        </Flex>
      </Navbar>
      <Styles layout>
        <AnimatePresence>
          {products
            .filter((product: Product) =>
              product.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((product: Product) => (
              <motion.div
                className="card"
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="images">
                  <Image src={product.image} className="image" />
                </div>
                <div className="footer">
                  <Title>
                    <Tooltip>{product.title}</Tooltip>
                  </Title>
                  <Br px={5} />
                  <Inline y="center">
                    <Text>Price</Text>
                    <Text> $ {format(product.price)}</Text>
                  </Inline>
                  <Br px={5} />
                  <div>
                    <Dropdown
                      menu={{ items: drops(product) }}
                      trigger={["click"]}
                    >
                      <Inline y="end">
                        <Text>{product.category}</Text>
                        <div>
                          <AppButton>
                            <EllipsisOutlined />
                          </AppButton>
                        </div>
                      </Inline>
                    </Dropdown>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </Styles>
    </Loader>
  );
}
