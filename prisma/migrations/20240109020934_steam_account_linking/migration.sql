-- CreateTable
CREATE TABLE "steam_accounts" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "steam_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "steam_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "steam_accounts_userId_key" ON "steam_accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "steam_accounts_steam_id_key" ON "steam_accounts"("steam_id");

-- AddForeignKey
ALTER TABLE "steam_accounts" ADD CONSTRAINT "steam_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
