import { useRouter } from "next/navigation";
import { Navbar } from "../_styles/elements";
import { AppButton } from "../_styles/form";
import Image from "next/image";

export default function MainNavbar() {
  const router = useRouter();

  return (
    <Navbar>
      <div className="logo">
        <Image src={"/logo.png"} alt="*" width={200} height={200} />
      </div>
      <AppButton onClick={() => router.push("/cart")}>Cart</AppButton>
    </Navbar>
  );
}
