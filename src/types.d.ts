import { auth } from "@clerk/nextjs/server";

const AuthObjectType = auth();
export type AuthType = typeof AuthObjectType;
