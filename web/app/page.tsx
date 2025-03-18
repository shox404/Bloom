"use client";

import { useEffect } from "react";
import { CategoryCard, Main } from "./_styles/products";
import { Title } from "./_styles/texts";
import { Block } from "./_styles/elements";
import { useGetCategoryQuery } from "./_lib/services/category";
import { useAppSelector } from "./_lib/hooks";
import { useRouter } from "next/navigation";
import { divider } from "./utils";
import AppImage from "./_components/image";
import MainNavbar from "./_components/navbar";
import { getCookie } from "./_utils/cookie";

export default function Home() {
  const { category } = useAppSelector((state) => state.category);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("admin-token");
    if (!token || token === "") router.push("/admin-login");
  }, [router]);

  useGetCategoryQuery();

  const filter = (name: string) => {
    router.push(`/products/${name}`);
  };

  return (
    <Main>
      <MainNavbar />
      <div className="blocks">
        {divider(category).map((list, index) => (
          <Block key={index}>
            {index == 0 ? <Title center>Category</Title> : ""}
            {list?.map((item, index) => (
              <CategoryCard key={index} onClick={() => filter(item.key)}>
                <AppImage image={item.image} ordinary />
                <Title className="title">{item.key}</Title>
              </CategoryCard>
            ))}
          </Block>
        ))}
      </div>
    </Main>
  );
}
