-- DropForeignKey
ALTER TABLE "cs2_teams" DROP CONSTRAINT "cs2_teams_capitan_id_fkey";

-- CreateTable
CREATE TABLE "cs2_team_invitations" (
    "id" SERIAL NOT NULL,
    "cs2_team_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cs2_team_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cs2_team_requests" (
    "id" SERIAL NOT NULL,
    "cs2_team_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cs2_team_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cs2_teams" ADD CONSTRAINT "cs2_teams_capitan_id_fkey" FOREIGN KEY ("capitan_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_team_invitations" ADD CONSTRAINT "cs2_team_invitations_cs2_team_id_fkey" FOREIGN KEY ("cs2_team_id") REFERENCES "cs2_teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_team_invitations" ADD CONSTRAINT "cs2_team_invitations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_team_requests" ADD CONSTRAINT "cs2_team_requests_cs2_team_id_fkey" FOREIGN KEY ("cs2_team_id") REFERENCES "cs2_teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_team_requests" ADD CONSTRAINT "cs2_team_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
