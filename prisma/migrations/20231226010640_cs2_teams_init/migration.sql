-- CreateEnum
CREATE TYPE "Color" AS ENUM ('RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE', 'PINK', 'BROWN', 'NAVY', 'VIOLET', 'CYAN', 'MAGENTA', 'LIME', 'TEAL', 'INDIGO', 'CORAL');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "cs2_team_id" INTEGER;

-- CreateTable
CREATE TABLE "Cs2Teams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" "Color" NOT NULL,
    "capitan_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Cs2Teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cs2Teams_capitan_id_key" ON "Cs2Teams"("capitan_id");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_cs2_team_id_fkey" FOREIGN KEY ("cs2_team_id") REFERENCES "Cs2Teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cs2Teams" ADD CONSTRAINT "Cs2Teams_capitan_id_fkey" FOREIGN KEY ("capitan_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
