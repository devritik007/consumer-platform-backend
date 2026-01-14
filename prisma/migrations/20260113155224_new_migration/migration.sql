/*
  Warnings:

  - The values [AVAILABLE_TODAY,AVAILABLE_THIS_WEEK] on the enum `Availability` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Availability_new" AS ENUM ('AVAILABLE', 'OUT_OF_STOCK');
ALTER TABLE "public"."Product" ALTER COLUMN "availability" DROP DEFAULT;
ALTER TABLE "public"."Product" ALTER COLUMN "availability" TYPE "public"."Availability_new" USING ("availability"::text::"public"."Availability_new");
ALTER TYPE "public"."Availability" RENAME TO "Availability_old";
ALTER TYPE "public"."Availability_new" RENAME TO "Availability";
DROP TYPE "public"."Availability_old";
ALTER TABLE "public"."Product" ALTER COLUMN "availability" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "public"."FarmerProfile" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'FARMER';

-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "availability" SET DEFAULT 'AVAILABLE';
