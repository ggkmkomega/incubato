import {
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { cn } from "~/lib/utils";

const MeetingRoom = () => {
  const [Layout, setLayout] = useState<CallLayoutType>("speaker-left");
  type CallLayoutType = "speaker-left" | "speaker-right" | "grid";
  const [ShowParticipant, setShowParticipant] = useState(false);

  const CallLayout = () => {
    switch (Layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="left" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 ">
      <div className="relative flex size-full items-center justify-center">
        <div className="full size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("hidden h-[calc(100vh-86px)]", {
            block: ShowParticipant,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipant(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls />
      </div>
    </section>
  );
};

export default MeetingRoom;
