import { Image } from "antd";
import { useGetImageQuery } from "../_lib/services/upload";

interface Props {
  image: string;
}

export default function AppImage({ image }: Props) {
  const { data } = useGetImageQuery(image);

  if (!data) return;

  return <Image src={data?.msg} alt="*" className="image" />;
}
