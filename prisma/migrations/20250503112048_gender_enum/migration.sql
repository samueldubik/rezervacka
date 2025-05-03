/*
  Warnings:

  - Added the required column `gender` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('NONE', 'MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;
