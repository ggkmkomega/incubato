import React from "react";
import { Mail } from "./components/mail";
import { api } from "~/trpc/server";
import { allMeetingsOutput } from "src/types";
const Meetings = async ({ meetings }: { meetings: allMeetingsOutput }) => {
  // return <Mail mails={meetings} />;
  return <div>Private</div>;
};

export default Meetings;
