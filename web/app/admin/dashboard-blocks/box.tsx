import { ReactNode } from "react";
import { Thin, Title } from "@/app/_styles/texts";

interface Props {
  icon: ReactNode;
  title: string;
  text: string;
}

export default function Box({ icon, title, text }: Props) {
  return (
    <div className="box">
      <div className="icon">{icon}</div>
      <div>
        <Title>{title}</Title>
        <Thin>{text}</Thin>
      </div>
    </div>
  );
}
