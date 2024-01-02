-- DropForeignKey
ALTER TABLE "Cs2Teams" DROP CONSTRAINT "Cs2Teams_capitan_id_fkey";

-- CreateTable
CREATE TABLE "cs2_teams_invitations" (
    "id" SERIAL NOT NULL,
    "cs2_team_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cs2_teams_invitations_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "Cs2Teams" ADD CONSTRAINT "Cs2Teams_capitan_id_fkey" FOREIGN KEY ("capitan_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_teams_invitations" ADD CONSTRAINT "cs2_teams_invitations_cs2_team_id_fkey" FOREIGN KEY ("cs2_team_id") REFERENCES "Cs2Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_teams_invitations" ADD CONSTRAINT "cs2_teams_invitations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_team_requests" ADD CONSTRAINT "cs2_team_requests_cs2_team_id_fkey" FOREIGN KEY ("cs2_team_id") REFERENCES "Cs2Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_team_requests" ADD CONSTRAINT "cs2_team_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;