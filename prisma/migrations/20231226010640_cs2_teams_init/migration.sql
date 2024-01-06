-- CreateEnum
CREATE TYPE "color" AS ENUM ('RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE', 'PINK', 'BROWN', 'NAVY', 'VIOLET', 'CYAN', 'MAGENTA', 'LIME', 'TEAL', 'INDIGO', 'CORAL');

-- AlterTable
ALTER TABLE "users" ADD COLUMN "cs2_team_id" INTEGER;

-- CreateTable
CREATE TABLE "cs2_teams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" "color" NOT NULL,
    "capitan_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "cs2_teams_pkey" PRIMARY KEY ("id")
);


-- CreateIndex
CREATE UNIQUE INDEX "cs2_teams_name_key" ON "cs2_teams"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cs2_teams_capitan_id_key" ON "cs2_teams"("capitan_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cs2_team_id_fkey" FOREIGN KEY ("cs2_team_id") REFERENCES "cs2_teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_teams" ADD CONSTRAINT "cs2_teams_capitan_id_fkey" FOREIGN KEY ("capitan_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
