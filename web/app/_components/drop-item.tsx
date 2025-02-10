import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

export default function DropItem({ children, onClick }: Props) {
  return (
    <div onClick={onClick}>
      <div>{children}</div>
    </div>
  );
}
