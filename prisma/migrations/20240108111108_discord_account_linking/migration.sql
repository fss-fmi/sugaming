-- CreateTable
CREATE TABLE "discord_accounts" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "discord_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "discord_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discord_accounts_userId_key" ON "discord_accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "discord_accounts_discord_id_key" ON "discord_accounts"("discord_id");

-- CreateIndex
CREATE UNIQUE INDEX "discord_accounts_access_token_key" ON "discord_accounts"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "discord_accounts_refresh_token_key" ON "discord_accounts"("refresh_token");

-- AddForeignKey
ALTER TABLE "discord_accounts" ADD CONSTRAINT "discord_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
