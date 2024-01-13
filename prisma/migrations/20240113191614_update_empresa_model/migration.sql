-- DropForeignKey
ALTER TABLE "empresas" DROP CONSTRAINT "empresas_professorId_fkey";

-- AlterTable
ALTER TABLE "empresas" ALTER COLUMN "professorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "empresas" ADD CONSTRAINT "empresas_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
