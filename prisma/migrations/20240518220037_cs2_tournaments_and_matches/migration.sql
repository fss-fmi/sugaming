-- CreateTable
CREATE TABLE "cs2_matches" (
    "id" SERIAL NOT NULL,
    "team1_id" INTEGER,
    "team2_id" INTEGER,
    "winner_next_match_id" INTEGER,
    "loser_next_match_id" INTEGER,
    "match_date" TIMESTAMPTZ NOT NULL,
    "cs2_tournament_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cs2_matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cs2_tournaments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "start_date" TIMESTAMPTZ NOT NULL,
    "end_date" TIMESTAMPTZ NOT NULL,
    "max_teams" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "cs2_tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Cs2TeamToCs2Tournament" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "cs2_tournaments_name_key" ON "cs2_tournaments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_Cs2TeamToCs2Tournament_AB_unique" ON "_Cs2TeamToCs2Tournament"("A", "B");

-- CreateIndex
CREATE INDEX "_Cs2TeamToCs2Tournament_B_index" ON "_Cs2TeamToCs2Tournament"("B");

-- AddForeignKey
ALTER TABLE "cs2_matches" ADD CONSTRAINT "cs2_matches_team1_id_fkey" FOREIGN KEY ("team1_id") REFERENCES "cs2_teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_matches" ADD CONSTRAINT "cs2_matches_team2_id_fkey" FOREIGN KEY ("team2_id") REFERENCES "cs2_teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_matches" ADD CONSTRAINT "cs2_matches_winner_next_match_id_fkey" FOREIGN KEY ("winner_next_match_id") REFERENCES "cs2_matches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_matches" ADD CONSTRAINT "cs2_matches_loser_next_match_id_fkey" FOREIGN KEY ("loser_next_match_id") REFERENCES "cs2_matches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cs2_matches" ADD CONSTRAINT "cs2_matches_cs2_tournament_id_fkey" FOREIGN KEY ("cs2_tournament_id") REFERENCES "cs2_tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Cs2TeamToCs2Tournament" ADD CONSTRAINT "_Cs2TeamToCs2Tournament_A_fkey" FOREIGN KEY ("A") REFERENCES "cs2_teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Cs2TeamToCs2Tournament" ADD CONSTRAINT "_Cs2TeamToCs2Tournament_B_fkey" FOREIGN KEY ("B") REFERENCES "cs2_tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
