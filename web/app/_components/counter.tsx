import { AppButton } from "../_styles/form";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { ADD_COUNT, REMOVE_COUNT } from "../_lib/reducers/cart";
import { useAppDispatch } from "../_lib/hooks";
import { Text } from "../_styles/texts";

interface Props {
  id: string;
  amount: number;
}

export default function Counter({ id, amount }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-2">
      <AppButton onClick={() => dispatch(ADD_COUNT(id))} className="h-4 w-8">
        <PlusOutlined className="text-xs" />
      </AppButton>
      <Text>{amount}</Text>
      <AppButton onClick={() => dispatch(REMOVE_COUNT(id))} className="h-4 w-8">
        <MinusOutlined className="text-xs" />
      </AppButton>
    </div>
  );
}
