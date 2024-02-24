-- CreateTable
CREATE TABLE "users" (
     "id" TEXT NOT NULL,
     "first_name" TEXT NOT NULL,
     "last_name" TEXT NOT NULL,
     "nickname" TEXT NOT NULL,
     "email" TEXT NOT NULL,
     "phone" TEXT NOT NULL,
     "password_hash" TEXT NOT NULL,
     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
     "updated_at" TIMESTAMPTZ NOT NULL,

     CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
