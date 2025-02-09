"use client";

import { Card, Main } from "./_styles/products";
import { Title } from "./_styles/texts";
import { Category } from "./types";
import { Block } from "./_styles/elements";

export default function Home() {
  const divider = (array: Category[]) => {
    const part = Math.ceil(array.length / 2);

    const first = array.slice(0, part);
    const second = array.slice(part, array.length);

    return [first, second];
  };

  return (
    <Main>
      {/* {divider(categories).map((list, index) => (
        <Block key={index}>
          {list?.map((item, index) => (
            <Card key={index}>
              <img src={item.image} alt="*" />
              <Title className="title">{item.name}</Title>
            </Card>
          ))}
        </Block>
      ))} */}
    </Main>
  );
}
