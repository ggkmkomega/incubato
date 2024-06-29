"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  const call = useCall();

  if (!call) {
    notFound();
  }
  useEffect(() => {
    const toggleMicAndCam = async () => {
      if (isMicCamToggled) {
        await call?.camera.disable();
        await call?.microphone.disable();
      } else {
        await call?.camera.enable();
        await call?.microphone.enable();
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    toggleMicAndCam();
  }, [isMicCamToggled, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <Checkbox
          id="mic"
          checked={isMicCamToggled}
          onCheckedChange={(checked) => {
            setIsMicCamToggled(checked === true ? true : false);
          }}
        />
        <Label
          className="flex items-center justify-center gap-2 font-medium"
          htmlFor="mic"
        >
          Join with mic and Camera Off
        </Label>
        <DeviceSettings />
        <Button
          onClick={async () => {
            await call.join();
            setIsSetupComplete(true);
          }}
          className="rounded-md bg-green-500 px-4 py-2.5"
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
