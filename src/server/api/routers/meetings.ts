import { eq } from "drizzle-orm";
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
      await ctx.db
        .insert(privateMeetings)
        .values({ ...input, authorId: ctx.session.userId });
    }),

  getAllMeetings: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.privateMeetings.findMany();
  }),
  getSingleMeeting: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.query.privateMeetings.findFirst({
        where: eq(privateMeetings.id, input),
        with: {
          author: true,
        },
      });
    }),
});
