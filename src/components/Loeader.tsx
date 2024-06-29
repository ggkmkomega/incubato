import React from "react";
import { Skeleton } from "./ui/skeleton";

const Loeader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Skeleton className="h-12 w-14 rounded-xl" />
    </div>
  );
};

export default Loeader;
