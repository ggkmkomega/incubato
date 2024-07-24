ALTER TABLE "Incubato_privateMeetings" ADD COLUMN "author_id" integer;--> statement-breakpoint
ALTER TABLE "Incubato_user" ADD COLUMN "lastname" varchar(256);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Incubato_privateMeetings" ADD CONSTRAINT "Incubato_privateMeetings_author_id_Incubato_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."Incubato_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
