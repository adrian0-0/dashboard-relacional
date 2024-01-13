import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const empresa = express.Router();
empresa.use(express.json());

//C
empresa.post("/empresa", async (request, response) => {
  const { name, programa, orientadorTecnico, monitor, professorId } =
    request.body;

  try {
    //Crie a Empresa
    const postEmpresaTab = await prisma.empresa.create({
      data: {
        name: name,
        programa: programa,
        orientadorTecnico: orientadorTecnico,
        monitor: monitor,
        professorId: professorId,
      },
    });

    return response.status(201).json(postEmpresaTab);
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ error: "Ops parece que algo deu errado" });
  }
});

//R
empresa.get("/empresa", async (request, response) => {
  const getEmpresaTab = await prisma.empresa.findMany();
  return response.status(200).json(getEmpresaTab);
});

//U
empresa.put("/empresa", async (request, response) => {
  const { id, name, programa, orientadorTecnico, monitor, professorId } =
    request.body;
  try {
    const putProfessorTab = await prisma.empresa.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        programa: programa,
        orientadorTecnico: orientadorTecnico,
        monitor: monitor,
        professorId: professorId,
      },
    });
    return response.status(201).json(putProfessorTab);
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ error: "Ops parece que algo deu errado" });
  }
});

//D
empresa.delete("/empresa/:id", async (request, response) => {
  const { id } = request.params;

  const intID = parseInt(id);

  //SE ID NÃO EXISTIR RETORNE
  if (!intID) {
    return response.status(400).json("ID é mandatório");
  }

  const empresaAlreadyExist = await prisma.empresa.findUnique({
    where: { id: intID },
  });
  //SE O MODEL TODO NÃO EXISTIR RETORNE
  if (!empresaAlreadyExist) {
    return response.status(404).json("Tabela [Empresa] não existe");
  }

  const delEmpresaTab = await prisma.empresa.delete({
    where: {
      id: intID,
    },
  });

  return response.status(200).send(delEmpresaTab);
});

export default empresa;
