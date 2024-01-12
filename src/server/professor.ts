import express from "express";
import { PrismaClient } from "@prisma/client";
import { request } from "http";

const prisma = new PrismaClient();
// const allTodos = [{ nome: "aaa", status: false }];
const professor = express.Router();
professor.use(express.json());

professor.get("/professor", async (request, response) => {
  const listProfessor = await prisma.professor.findMany();
  return response.status(200).json(listProfessor);
});
export default professor;
