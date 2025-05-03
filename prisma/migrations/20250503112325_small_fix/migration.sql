/*
  Warnings:

  - Changed the type of `gender` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('NONE', 'MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "gender",
ADD COLUMN     "gender" "GENDER" NOT NULL;

-- DropEnum
DROP TYPE "Gender";
