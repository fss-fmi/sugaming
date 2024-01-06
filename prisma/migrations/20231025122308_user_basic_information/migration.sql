-- CreateTable
CREATE TABLE "users" (
     "id" TEXT NOT NULL,
     "email" TEXT,
     "password_hash" TEXT,
     "first_name" TEXT,
     "last_name" TEXT,
     "nickname" TEXT,
     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
     "updated_at" TIMESTAMPTZ NOT NULL,

     CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);


-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");
