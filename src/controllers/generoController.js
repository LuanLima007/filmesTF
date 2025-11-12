import express from "express";
import generoEntity from "../entities/genero.js";
import { AppDataSource } from "../database/data-source.js";

const route = express.Router();
const generoRepository = AppDataSource.getRepository(generoEntity);


route.post("/", async (req, res) => {
  const { nome } = req.body;

  if (!nome || nome.length < 1) {
    return res.status(400).send({ response: "O nome do gênero é obrigatório!" });
  }

  const newGenero = generoRepository.create({ nome });

  try {
    await generoRepository.save(newGenero);
    return res.status(201).send({
      response: `O gênero ${nome} foi cadastrado com sucesso!`
    });
  } catch (err) {
    return res.status(500).send({ response: `Houve um erro: ${err}` });
  }
});


route.get("/", async (req, res) => {
  try {
    const generos = await generoRepository.find();
    return res.status(200).send({ response: generos });
  } catch (err) {
    return res.status(500).send({ response: `Houve um erro: ${err}` });
  }
});

route.put("/", async (req, res) => {
  const { id, nome } = req.body;

  if (!id) {
    return res.status(400).send({ response: "O ID do gênero é obrigatório!" });
  }

  try {
    await generoRepository.update(id, { nome });
    return res.status(200).send({ response: "Gênero atualizado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ response: `Houve um erro: ${err}` });
  }
});


route.delete("/:idGenero", async (req, res) => {
  const { idGenero } = req.params;

  try {
    await generoRepository.delete(idGenero);
    return res.status(200).send({ response: "Gênero deletado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ response: `Houve um erro: ${err}` });
  }
});

export default route;
