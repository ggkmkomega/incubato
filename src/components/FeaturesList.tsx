"use client";
import React, { useState } from "react";
import Feature from "./Feature";
import {
  Plus,
  UserRoundPlus,
  Link,
  Video,
  CalendarCheck2,
  CalendarClock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ScheduleMeetingModal from "./ScheduleMeetingModal";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015

import dayjs from "dayjs";
import { Toast } from "./ui/toast";

const FeaturesList = ({ admin }: { admin?: boolean }) => {
  dayjs.extend(advancedFormat);

  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [Values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "/",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeet = async () => {
    if (!client || !user) return;
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create a call");
      const startsAt =
        Values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = Values.description ?? "Instant Meet";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!Values.dateTime) {
        toast({
          title: "Please Select Date and Time",
          variant: "destructive",
        });
        return;
      }
      if (!Values.description) {
        router.push(`/meeting/${call.id}`);
        toast({
          title: "Meeting Created",
          description: dayjs(Values.dateTime).format("dddd, Do YYYY"),
        });
      }
    } catch (error) {
      const errorText = error as string;
      toast({
        title: "Failed:To Create a meeting",
        description: errorText,
        variant: "destructive",
      });
      console.log("error Create Meet ", error);
    }
  };
  const [meetingState, setMeetingState] = useState<
    | "isAdminStartMeet"
    | "isRequestingMeeting"
    | "isJoiningMeeting"
    | "isAdminScheduleMeeting"
    | undefined
  >();
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
      {admin && (
        <>
          <Feature
            icon={Plus}
            subtitle="Start a meet"
            title="Start a meet"
            hadnleClick={() => setMeetingState("isAdminStartMeet")}
            className="bg-rose-600"
          />
          <Feature
            icon={CalendarClock}
            subtitle="Scheduled a Meeting"
            title="Schedule a  Meeting "
            hadnleClick={() => setMeetingState("isAdminScheduleMeeting")}
            className="bg-yellow-600"
          />
        </>
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
        hadnleClick={() => router.push("/upcoming")}
        className="bg-purple-600"
      />
      <Feature
        icon={Video}
        subtitle="View Recordings"
        title="Check Out Seance Recordings"
        hadnleClick={() => router.push("/recordings")}
        className="bg-lime-600"
      />
      {!callDetails ? (
        <MeetingModal
          title="Schedule a meet"
          handleClick={createMeet}
          onClose={() => setMeetingState(undefined)}
          isOpen={meetingState === "isAdminScheduleMeeting"}
        />
      ) : (
        <MeetingModal
          title="meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          handleClick={createMeet}
          onClose={() => {
            //  navigator.clipboard.writeText(meetingLink)
            // Toast({
            //   title: "Link Copied",
            // });
          }}
          isOpen={meetingState === "isAdminScheduleMeeting"}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        ></MeetingModal>
      )}
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
