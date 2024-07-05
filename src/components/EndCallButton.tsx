"use client";

import {
  CallingState,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  if (!call)
    throw new Error(
      "useStreamCall must be used within a StreamCall component.",
    );

  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call?.endCall().finally(() => {
      router.push("/");
    });
  };

  return (
    <Button onClick={endCall} variant={"destructive"}>
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
