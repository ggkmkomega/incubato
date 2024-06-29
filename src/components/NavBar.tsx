import Link from "next/link";
import React from "react";
import MobileNav from "./Mobile-nav";
import { ModeToggle } from "~/components/ThemeToggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface NavbarProps {
  admin?: boolean;
}
const NavBar = ({ admin }: NavbarProps) => {
  return (
    <nav className="flex-between z-50  w-full bg-accent px-6 py-4">
      <Link href="/" className="flex items-center gap-1 ">
        <p className="text-[26px] font-extrabold max-sm:hidden">Dz Incubato</p>
      </Link>

      <div className="flex-between gap-5">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
        <MobileNav admin={admin} />
      </div>
    </nav>
  );
};

export default NavBar;
