import { Image as AntImage } from "antd";
import { useGetImageQuery } from "../_lib/services/upload";

interface Props {
  image: string;
  ordinary?: boolean;
}

export default function AppImage({ image, ordinary }: Props) {
  const { data } = useGetImageQuery(image);

  if (!data) return;

  return ordinary ? (
    <AntImage src={data?.msg} alt="*" className="image" />
  ) : (
    <AntImage src={data?.msg} alt="*" className="image" />
  );
}
