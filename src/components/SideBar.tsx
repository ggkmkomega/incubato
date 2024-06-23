"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { sideBarLinks } from "~/constants";
import Link from "next/link";
import { cn } from "~/lib/utils";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 flex h-screen w-fit flex-col justify-between bg-accent p-6 pt-28 max-sm:hidden lg:w-[264]">
      <div className="flex flex-1 flex-col gap-6">
        {sideBarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(link.route);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex items-center justify-start gap-4 rounded-lg p-4",
                {
                  "bg-blue-1": isActive,
                },
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
      SideBar
    </section>
  );
};

export default SideBar;
