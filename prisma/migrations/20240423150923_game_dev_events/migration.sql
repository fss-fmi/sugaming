-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gameDevEventId" INTEGER;

-- CreateTable
CREATE TABLE "game_dev_events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "start_date" TIMESTAMPTZ NOT NULL,
    "end_date" TIMESTAMPTZ NOT NULL,
    "facebook_event_url" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "game_dev_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_dev_events_participants" (
    "id" SERIAL NOT NULL,
    "game_dev_event_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_jam_role" TEXT,
    "want_to_participate_in_workshops" BOOLEAN,
    "technology_stack" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "game_dev_events_participants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_dev_events_name_key" ON "game_dev_events"("name");

-- CreateIndex
CREATE UNIQUE INDEX "game_dev_events_facebook_event_url_key" ON "game_dev_events"("facebook_event_url");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_gameDevEventId_fkey" FOREIGN KEY ("gameDevEventId") REFERENCES "game_dev_events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_dev_events_participants" ADD CONSTRAINT "game_dev_events_participants_game_dev_event_id_fkey" FOREIGN KEY ("game_dev_event_id") REFERENCES "game_dev_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_dev_events_participants" ADD CONSTRAINT "game_dev_events_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
