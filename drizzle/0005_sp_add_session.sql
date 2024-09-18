CREATE TABLE IF NOT EXISTS "sp_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deck_id" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sp_user_to_session" (
	"session_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sp_user_to_session_user_id_session_id_pk" PRIMARY KEY("user_id","session_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sp_user_to_session" ADD CONSTRAINT "sp_user_to_session_session_id_sp_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sp_session"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
