CREATE TABLE `sb_users` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`lastLoginAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sb_games` (
	`id` text PRIMARY KEY NOT NULL,
	`rows` integer NOT NULL,
	`cols` integer NOT NULL,
	`status` text DEFAULT 'idle' NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sb_usersToGames` (
	`userId` text NOT NULL,
	`gameId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `sb_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`gameId`) REFERENCES `sb_games`(`id`) ON UPDATE no action ON DELETE no action
);
