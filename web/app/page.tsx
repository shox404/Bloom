"use client";

import { useGetUserQuery } from "./lib/services/users";

export default function Home() {

  useGetUserQuery();

  return <main>hi</main>;
}
