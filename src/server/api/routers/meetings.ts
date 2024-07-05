import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { privateMeetings } from "~/server/db/schema";

export const meetingsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        lastname: z.string(),
        idea: z.string(),
        category: z.enum(["Discussing", "Consulting", "Inquiry"]),
        subject: z.string(),
        urgency: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(privateMeetings).values(input);
    }),
});
