import React from "react";
import { api } from "~/trpc/server";

const Personal = async () => {
  const meetings = await api.meetings.testQuery();

  return (
    <section className="flex size-full flex-col gap-10 ">
      <h1 className="text-3xl font-bold">Personal Room</h1>
    </section>
  );
};

export default Personal;
