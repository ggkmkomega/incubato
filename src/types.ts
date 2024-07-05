import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
export type allMeetingsOutput = RouterOutputs["meetings"]["getAllMeetings"];
export type singleMeetingsOutput =
  RouterOutputs["meetings"]["getAllMeetings"][number];
