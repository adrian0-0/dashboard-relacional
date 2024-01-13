import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const professor = express.Router();
professor.use(express.json());

//C
professor.post("/professor", async (request, response) => {
  const { name, email, empresa } = request.body;

  try {
    // 1. Crie o Professor
    const postProfessorTab = await prisma.professor.create({
      data: {
        name: name,
        email: email,
      },
    });

    // 2. Se uma empresa for fornecido, associe o Professor a essa Empresa
    if (empresa && empresa.length > 0) {
      for (const empresaId of empresa) {
        await prisma.empresa.update({
          where: {
            id: empresaId,
          },
          data: {
            professorId: postProfessorTab.id,
          },
        });
      }
    }

    return response.status(201).json(postProfessorTab);
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ error: "Ops parece que algo deu errado" });
  }
});

//R
professor.get("/professor", async (request, response) => {
  const getProfessorTab = await prisma.professor.findMany();
  return response.status(200).json(getProfessorTab);
});

//U
professor.put("/professor", async (request, response) => {
  const { id, name, email, empresa } = request.body;
  try {
    const putProfessorTab = await prisma.professor.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
      },
    });
    // 2. Se uma empresa for fornecido, associe o Professor a essa Empresa
    if (empresa && empresa.length > 0) {
      for (const empresaId of empresa) {
        await prisma.empresa.update({
          where: {
            id: empresaId,
          },
          data: {
            professorId: putProfessorTab.id,
          },
        });
      }
    }
    return response.status(201).json(putProfessorTab);
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ error: "Ops parece que algo deu errado" });
  }
});

//D
professor.delete("/professor/:id", async (request, response) => {
  const { id } = request.params;

  const intID = parseInt(id);

  //SE ID NÃO EXISTIR RETORNE
  if (!intID) {
    return response.status(400).json("ID é mandatório");
  }

  const professorAlreadyExist = await prisma.professor.findUnique({
    where: { id: intID },
  });
  //SE O MODEL TODO NÃO EXISTIR RETORNE
  if (!professorAlreadyExist) {
    return response.status(404).json("Tabela [Professor] não existe");
  }

  const delProfessorTab = await prisma.professor.delete({
    where: {
      id: intID,
    },
  });

  return response.status(200).send(delProfessorTab);
});

export default professor;
