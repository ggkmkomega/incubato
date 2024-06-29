"use server";
import { StreamClient } from "@stream-io/node-sdk";

import { currentUser } from "@clerk/nextjs/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const TokenProvider = async () => {
  const user = await currentUser();
  if (!user) throw new Error("No User");
  if (!apiKey) throw new Error("No apiKey");
  if (!apiSecret) throw new Error("No apiSecret");
  const client = new StreamClient(apiKey, apiSecret);
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const issued = Math.floor(Date.now() / 1000) - 60;
  const token = client.createToken(user.id, exp, issued);
  return token;
};
