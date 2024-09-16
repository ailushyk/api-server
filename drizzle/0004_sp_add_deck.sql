CREATE TABLE IF NOT EXISTS "sp_card" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deckId" uuid,
	"title" varchar NOT NULL,
	"value" numeric,
	"orderIndex" smallint NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sp_deck" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sp_deck_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sp_card" ADD CONSTRAINT "sp_card_deckId_sp_deck_id_fk" FOREIGN KEY ("deckId") REFERENCES "public"."sp_deck"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sp_deck_slug_index" ON "sp_deck" USING btree ("slug");

--> statement-breakpoint
INSERT INTO sp_deck ("name", "slug") VALUES ('Standard', 'standard');

--> statement-breakpoint
WITH deck_id AS (
  SELECT id FROM sp_deck WHERE slug = 'standard'
)
INSERT INTO sp_card ("deckId", "title", "value", "orderIndex")
VALUES
((SELECT id FROM deck_id), '?', null, 12),
((SELECT id FROM deck_id), '100', 100, 11),
((SELECT id FROM deck_id), '40', 40, 10),
((SELECT id FROM deck_id), '20', 20, 9),
((SELECT id FROM deck_id), '13', 13, 8),
((SELECT id FROM deck_id), '8', 8, 7),
((SELECT id FROM deck_id), '5', 5, 6),
((SELECT id FROM deck_id), '3', 3, 5),
((SELECT id FROM deck_id), '2', 2, 4),
((SELECT id FROM deck_id), '1', 1, 3),
((SELECT id FROM deck_id), '0.5', 0.5, 2),
((SELECT id FROM deck_id), '0', 0, 1),
((SELECT id FROM deck_id), '☕', null, 0);
