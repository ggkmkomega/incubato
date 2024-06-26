"use client";
import React, { useState } from "react";
import Feature from "./Feature";
import { Plus, UserRoundPlus, Link, Video, CookingPot } from "lucide-react";
import { useRouter } from "next/navigation";
import ScheduleMeetingModal from "./ScheduleMeetingModal";

const FeaturesList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    | "isRequestingMeeting"
    | "isJoiningMeeting"
    | "isJoiningScheduleMeeting"
    | undefined
  >();
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
      <Feature
        icon={Plus}
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
        className="bg-yellow-600"
      />
      <Feature
        icon={CookingPot}
        subtitle="Cooming Soon"
        title="Cooming Soon"
        hadnleClick={() => null}
        className="bg-lime-600"
      />
      <ScheduleMeetingModal
        isOpen={meetingState === "isRequestingMeeting"}
        onClose={() => setMeetingState(undefined)}
      />
    </section>
  );
};

export default FeaturesList;
