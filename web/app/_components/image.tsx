import Image from "next/image";
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
    <Image src={data?.msg} alt="*" className="inner-image" width={200} height={200} />
  ) : (
    <AntImage src={data?.msg} alt="*" className="inner-image" />
  );
}
