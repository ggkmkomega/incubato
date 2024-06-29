import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { user } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  testDb: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(user).values({ name: input });
  }),
});
