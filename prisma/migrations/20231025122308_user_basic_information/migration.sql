-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "password_hash" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "nickname" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_nickname_key" ON "Users"("nickname");
