"use client";

import { useEffect } from "react";
import { getUser, useGetUserQuery } from "./lib/services/users";

export default function Home() {
  useEffect(() => {
    useGetUserQuery("id");
  }, []);

  return <main>hi</main>;
}
