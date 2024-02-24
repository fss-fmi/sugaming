/*
  Warnings:

  - A unique constraint covering the columns `[university_faculty_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `university_degree` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university_faculty_number` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university_major` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university_year` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "university_degree" AS ENUM ('BACHELOR', 'MASTER', 'DOCTORATE');

-- CreateEnum
CREATE TYPE "university_year" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "university_degree" "university_degree" NOT NULL,
ADD COLUMN     "university_faculty_number" TEXT NOT NULL,
ADD COLUMN     "university_major" TEXT NOT NULL,
ADD COLUMN     "university_year" "university_year" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_university_faculty_number_key" ON "users"("university_faculty_number");
