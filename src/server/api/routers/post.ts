import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { user } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  testDb: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.db.insert(user).values({ name: "Sdsd" });
  }),
});
