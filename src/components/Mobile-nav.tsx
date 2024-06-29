"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { sideBarLinks } from "~/constants";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import Image from "next/image";
import { Icons } from "./icons";
interface MobileNavProps {
  admin?: boolean;
}
const MobileNav = ({ admin }: MobileNavProps) => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Menu size={36} className="cursor-pointer sm:hidden" />
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/" className="flex items-center gap-1 ">
            <p className="text-[26px] font-extrabold ">Dz Incubato</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16">
                {sideBarLinks.map((link) => {
                  const isActive = pathname === link.route;
                  return (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.route}
                        className={cn(
                          "flex items-center justify-start gap-4 rounded-lg p-4",
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
                        <p className=" font-semibold ">{link.label}</p>
                      </Link>
                    </SheetClose>
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
              </section>
            </SheetClose>
          </div>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
