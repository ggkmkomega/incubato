import React from "react";
import { Skeleton } from "./ui/skeleton";

const Loeader = () => {
  return (
    <main className="relative">
      <Skeleton className="flex-between z-50  h-[26px] w-full bg-accent px-6 py-4" />
      <div className="flex">
        <Skeleton className="sticky left-0 flex h-screen w-fit flex-col justify-between bg-accent p-6 pt-12 max-sm:hidden lg:w-[264]">
          <div className="flex flex-1 flex-col gap-6">
            <Skeleton className="flex w-full max-w-60 items-center gap-4 rounded-lg p-4" />
            <Skeleton className="flex w-full max-w-60 items-center gap-4 rounded-lg p-4" />
            <Skeleton className="flex w-full max-w-60 items-center gap-4 rounded-lg p-4" />
            <Skeleton className="flex w-full max-w-60 items-center gap-4 rounded-lg p-4" />
          </div>
        </Skeleton>
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-12 max-md:pb-14 sm:px-14">
          <div className="w-full">
            <section className="flex size-full flex-col gap-10 ">
              <div className="h-[300px] w-full rounded-md bg-hero bg-cover text-background dark:text-foreground">
                <Skeleton className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11" />
              </div>
              <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
                <Skeleton className="flex min-h-[260px] w-full cursor-pointer flex-col justify-between rounded-[14px] px-4 py-6 xl:max-w-[270px]" />
                <Skeleton className="flex min-h-[260px] w-full cursor-pointer flex-col justify-between rounded-[14px] px-4 py-6 xl:max-w-[270px]" />
                <Skeleton className="flex min-h-[260px] w-full cursor-pointer flex-col justify-between rounded-[14px] px-4 py-6 xl:max-w-[270px]" />
                <Skeleton className="flex min-h-[260px] w-full cursor-pointer flex-col justify-between rounded-[14px] px-4 py-6 xl:max-w-[270px]" />
              </section>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Loeader;
