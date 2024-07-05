import React from "react";
import { Mail } from "./components/mail";
import { api } from "~/trpc/server";
const Meetings = async () => {
  const meetings = await api.meetings.getAllMeetings();
  return <Mail mails={meetings} />;
};

export default Meetings;
