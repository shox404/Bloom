import { useState } from "react";
import { AppButton } from "../_styles/form";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col">
      <AppButton onClick={() => setCount(count + 1)} className="h-4 w-8">
        <PlusOutlined className="text-xs" />
      </AppButton>
      <AppButton onClick={() => setCount(count - 1)} className="h-4 w-8">
        <MinusOutlined className="text-xs" />
      </AppButton>
    </div>
  );
}
