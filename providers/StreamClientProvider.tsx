"use client";
import { useUser } from "@clerk/nextjs";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { TokenProvider } from "actions/stream.actions";
import { ReactNode, useEffect, useState } from "react";
import Loeader from "~/components/Loeader";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const userId = "user-id";
const token = "authentication-token";
const user: User = { id: userId };

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API KEY Missing");
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username ?? user?.id,
        image: user?.imageUrl,
      },
      tokenProvider: TokenProvider,
    });
    setVideoClient(client);
  }, [user, isLoaded]);
  if (!videoClient) return <Loeader />;
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
export default StreamVideoProvider;
