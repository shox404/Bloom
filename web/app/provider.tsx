"use client";

import { Provider } from "react-redux";
import { store } from "@/app/lib/store";
import { ReactNode } from "react";

export default function Store({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
