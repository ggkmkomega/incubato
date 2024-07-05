CREATE TABLE IF NOT EXISTS "Incubato_privateMeetings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"lastname" varchar(256),
	"idea" varchar(256),
	"category" varchar,
	"subject" varchar(256),
	"urgency" boolean
);
--> statement-breakpoint
ALTER TABLE "create-t3-default_user" RENAME TO "Incubato_user";