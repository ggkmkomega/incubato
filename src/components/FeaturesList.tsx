"use client";
import React, { useState } from "react";
import Feature from "./Feature";
import { Plus, UserRoundPlus, Link, Video, CalendarCheck2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ScheduleMeetingModal from "./ScheduleMeetingModal";
import MeetingModal from "./MeetingModal";

const FeaturesList = ({ admin }: { admin?: boolean }) => {
  const router = useRouter();

  const createMeet = () => {
    console.log("admin Click");
  };
  const [meetingState, setMeetingState] = useState<
    | "isAdminStartMeet"
    | "isRequestingMeeting"
    | "isJoiningMeeting"
    | "isJoiningScheduleMeeting"
    | undefined
  >();
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
      {admin && (
        <Feature
          icon={Plus}
          subtitle="Start a meet"
          title="Start a meet"
          hadnleClick={() => setMeetingState("isAdminStartMeet")}
          className="bg-rose-600"
        />
      )}
      <Feature
        icon={CalendarCheck2}
        subtitle="Request a private Meeting"
        title="Schedule a Private Meeting"
        hadnleClick={() => setMeetingState("isRequestingMeeting")}
        className="bg-amber-600"
      />
      <Feature
        icon={Link}
        subtitle="Join a  Meeting"
        title="Join a Meeting From A Link"
        hadnleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-primary"
      />
      <Feature
        icon={UserRoundPlus}
        subtitle="Join a Scheduled Meeting"
        title="Join a  Meeting "
        hadnleClick={() => setMeetingState("isJoiningScheduleMeeting")}
        className="bg-purple-600"
      />
      <Feature
        icon={Video}
        subtitle="View Recordings"
        title="Check Out Seance Recordings"
        hadnleClick={() => router.push("/recordings")}
        className="bg-lime-600"
      />
      <MeetingModal
        title="Start a meet"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeet}
        onClose={() => setMeetingState(undefined)}
        isOpen={meetingState === "isAdminStartMeet"}
      />
      <ScheduleMeetingModal
        isOpen={meetingState === "isRequestingMeeting"}
        onClose={() => setMeetingState(undefined)}
      />
    </section>
  );
};

export default FeaturesList;
