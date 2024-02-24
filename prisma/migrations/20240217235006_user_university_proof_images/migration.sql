-- CreateTable
CREATE TABLE "university_proof_images" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "university_proof_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "university_proof_images" ADD CONSTRAINT "university_proof_images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
