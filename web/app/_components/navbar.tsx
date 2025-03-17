import { useRouter } from "next/navigation";
import { ClientNavbar } from "../_styles/elements";
import { AppButton } from "../_styles/form";
import Image from "next/image";

export default function MainNavbar() {
  const router = useRouter();

  return (
    <ClientNavbar>
      <div className="logo">
        <Image src={"/logo.png"} alt="*" width={200} height={200} />
      </div>
      <AppButton onClick={() => router.push("/cart")}>Cart</AppButton>
    </ClientNavbar>
  );
}

export function CartNavbar() {
  return (
    <ClientNavbar>
      <div className="logo">
        <Image src={"/logo.png"} alt="*" width={200} height={200} />
      </div>
    </ClientNavbar>
  );
}
