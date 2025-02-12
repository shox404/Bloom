"use client";

import { CategoryCard, Main } from "./_styles/products";
import { Title } from "./_styles/texts";
import { Category } from "./types";
import { Block, Navbar } from "./_styles/elements";
import { useGetCategoryQuery } from "./_lib/services/category";
import { useAppSelector } from "./_lib/hooks";
import { AppButton } from "./_styles/form";
import { useRouter } from "next/navigation";
import AppImage from "./_components/image";
import Image from "next/image";

export default function Home() {
  const { category } = useAppSelector((state) => state.category);
  const router = useRouter();

  const divider = (array: Category[]) => {
    const part = Math.ceil(array.length / 2);
    const first = array.slice(0, part);
    const second = array.slice(part, array.length);
    return [first, second];
  };

  useGetCategoryQuery();

  const filter = (name: string) => {
    router.push(`/products/${name}`);
  };

  return (
    <Main>
      <Navbar>
        <div className="logo">
          <Image src={"../app/_assets/logo.png"} alt="*" />
        </div>
        <AppButton>Cart</AppButton>
      </Navbar>
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
