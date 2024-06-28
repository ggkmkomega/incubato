import { auth } from "@clerk/nextjs/server";
import React from "react";
import NavBar from "~/components/NavBar";
import SideBar from "~/components/SideBar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { sessionClaims } = auth();
  if (sessionClaims?.metadata.role === "admin")
    return (
      <main className="relative">
        {sessionClaims?.metadata.role === "admin" ? (
          <NavBar admin />
        ) : (
          <NavBar />
        )}
        <div className="flex">
          {sessionClaims?.metadata.role === "admin" ? (
            <SideBar admin />
          ) : (
            <SideBar />
          )}

          <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-12 max-md:pb-14 sm:px-14">
            <div className="w-full"> {children}</div>
          </section>
        </div>
      </main>
    );
};

export default HomeLayout;
