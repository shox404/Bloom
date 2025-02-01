"use client";

import products from "@/app/_database/products.json";
import { Card, Main } from "./_styles/products";
import { Title } from "./_styles/texts";

export default function Home() {
  return (
    <Main>
      {products.map((product, index) => (
        <Card key={index}>
          <img src={product.image} alt="*" />
          <Title className="title">{product.title}</Title>
        </Card>
      ))}
      {products.map((product, index) => (
        <Card key={index}>
          <img src={product.image} alt="*" />
          <Title className="title">{product.title}</Title>
        </Card>
      ))}
      {products.map((product, index) => (
        <Card key={index}>
          <img src={product.image} alt="*" />
          <Title className="title">{product.title}</Title>
        </Card>
      ))}
      {products.map((product, index) => (
        <Card key={index}>
          <img src={product.image} alt="*" />
          <Title className="title">{product.title}</Title>
        </Card>
      ))}
    </Main>
  );
}
