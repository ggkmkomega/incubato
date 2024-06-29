"use client";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useGetCallById } from "hooks/useGetCallById";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import Loeader from "~/components/Loeader";
import MeetingRoom from "~/components/MeetingRoom";
import MeetingSetup from "~/components/MeetingSetup";

const Meeting = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const theme = useTheme();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(params.id);
  if (!isLoaded || isCallLoading) return <Loeader />;
  return (
    <main className="h-screen w-full ">
      <StreamCall call={call}>
        <StreamTheme className={theme.theme}>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
