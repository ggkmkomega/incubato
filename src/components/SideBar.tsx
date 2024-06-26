"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { sideBarLinks } from "~/constants";
import Link from "next/link";
import { cn } from "~/lib/utils";
import Image from "next/image";
import { Icons } from "./icons";
interface SideBarProps {
  admin?: boolean;
}
const SideBar = ({ admin }: SideBarProps) => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 flex h-screen w-fit flex-col justify-between bg-accent p-6 pt-12 max-sm:hidden lg:w-[264]">
      <div className="flex flex-1 flex-col gap-6">
        {sideBarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex w-full max-w-60 items-center gap-4 rounded-lg p-4",
                {
                  "bg-primary": isActive,
                },
              )}
            >
              {link.icon ? (
                <link.icon />
              ) : (
                <Image
                  src={link.imgUrl}
                  alt={link.label}
                  width={20}
                  height={20}
                />
              )}
              <p className="font-semibold">{link.label}</p>
            </Link>
          );
        })}
        {admin && (
          <Link
            className={cn(
              "flex w-full max-w-60 items-center gap-4 rounded-lg p-4 font-semibold",
              {
                "bg-primary": pathname.startsWith("/dashboard"),
              },
            )}
            href="/dashboard"
          >
            <Icons.dashboard />
            Dashboard
          </Link>
        )}
      </div>
      SideBar
    </section>
  );
};

export default SideBar;
