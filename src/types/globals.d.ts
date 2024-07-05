export {};

// Create a type for the roles
export type Roles = "admin" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
export const PrivateMeetingSchema = z.object({
  name: z.string().min(5).max(20),
  lastname: z.string().min(5).max(20),
  idea: z.string().min(3).max(30),
  category: z.enum(["Discussing", "Consulting", "Inquiry"]),
  subject: z.string().min(50).max(250),
  urgency: z.boolean(),
});
