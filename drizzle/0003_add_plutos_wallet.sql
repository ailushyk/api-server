CREATE TABLE IF NOT EXISTS "plutos_wallet_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
INSERT INTO "plutos_wallet_type" ("name")
VALUES
    ('Checking Account'),
    ('Savings Account'),
    ('Credit Card'),
    ('Loan'),
    ('Cash'),
    ('Investment Account'),
    ('Retirement Account'),
    ('Cryptocurrency Wallet'),
    ('Prepaid Card'),
    ('Business Account');
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plutos_wallet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"typeId" uuid,
	"balance" numeric(19, 4) DEFAULT '0' NOT NULL,
	"currency" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plutos_wallet" ADD CONSTRAINT "plutos_wallet_typeId_plutos_wallet_type_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."plutos_wallet_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plutos_wallet" ADD CONSTRAINT "plutos_wallet_currency_plutos_currency_symbol_fk" FOREIGN KEY ("currency") REFERENCES "public"."plutos_currency"("symbol") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
