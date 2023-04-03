"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";

export const Logo = (): JSX.Element => {
  const router: AppRouterInstance = useRouter();

  return (
    <Image
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
      src="/images/logo.png"
      onClick={() => router.push("/")}
    />
  );
};
