/*
  Warnings:

  - You are about to drop the column `atsScore` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `isPaidOptimized` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `potentialScore` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscription` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Interview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobListing` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[resumeId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[settingId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeUrl` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themeName` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_userId_fkey";

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_userId_fkey";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "atsScore",
DROP COLUMN "content",
DROP COLUMN "isPaidOptimized",
DROP COLUMN "potentialScore",
DROP COLUMN "title",
DROP COLUMN "userId",
ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "resumeUrl" TEXT NOT NULL,
ADD COLUMN     "themeName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "subscription",
ADD COLUMN     "profilePicUrl" TEXT,
ADD COLUMN     "resumeId" TEXT,
ADD COLUMN     "settingId" TEXT,
ADD COLUMN     "tokens" INTEGER NOT NULL DEFAULT 4000,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Interview";

-- DropTable
DROP TABLE "JobListing";

-- CreateTable
CREATE TABLE "SavedJob" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewReport" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "feedback" JSONB,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "darkMode" BOOLEAN NOT NULL DEFAULT false,
    "notificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "language" TEXT NOT NULL DEFAULT 'en',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_resumeId_key" ON "User"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_settingId_key" ON "User"("settingId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_settingId_fkey" FOREIGN KEY ("settingId") REFERENCES "Setting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedJob" ADD CONSTRAINT "SavedJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewReport" ADD CONSTRAINT "InterviewReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
