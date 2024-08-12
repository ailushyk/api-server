CREATE TABLE IF NOT EXISTS "plutos_currency" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"symbol" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "plutos_currency_symbol_unique" UNIQUE("symbol")
);

-- Insert currencies into the plutos_currency table
INSERT INTO "plutos_currency" ("name", "symbol")
VALUES
  ('US Dollar', 'USD'),
  ('Euro', 'EUR'),
  ('British Pound', 'GBP'),
  ('Japanese Yen', 'JPY'),
  ('Polish Złoty', 'PLN');