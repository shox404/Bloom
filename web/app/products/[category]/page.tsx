"use client";

import { useAppSelector } from "@/app/_lib/hooks";
import { useGetProductByCategoryQuery } from "@/app/_lib/services/products";
import { useParams } from "next/navigation";

export default function Products() {
  const { category } = useParams();
  const { productsByCategory } = useAppSelector((state) => state.products);

  useGetProductByCategoryQuery(category);

  return (
    <div>
      {productsByCategory.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  );
}
