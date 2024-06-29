import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { cn } from "~/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { checkRole } from "~/lib/roles";
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
    <section className="relative h-screen w-full overflow-hidden pt-4">
      <div className="relative flex size-full items-center justify-center">
        <div className=" flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("ml-4 hidden h-[calc(100vh-86px)]", {
            block: ShowParticipant,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipant(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 overflow-hidden">
        <CallControls />
        <DropdownMenu>
          <DropdownMenuTrigger className=" cursor-pointer rounded-2xl bg-primary-foreground px-4 py-2 hover:bg-primary">
            <Icons.LayoutControl />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["Grid", "speaker-left", "speaker-right"].map((item, index) => (
              <div>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setLayout(item.toLowerCase() as CallLayoutType);
                  }}
                  key={index}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-background" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <Button onClick={() => setShowParticipant((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-primary px-4 py-2 hover:bg-primary">
            <Icons.User size={20} />
          </div>
        </Button>
      </div>
      {checkRole("admin") && <Button variant={"destructive"}>End Call</Button>}
    </section>
  );
};

export default MeetingRoom;
