import express from "express";
import filmeEntity from "../entities/filme.js";
import { generoRepository } from "./generoController.js"
import { AppDataSource } from "../database/data-source.js";

const route = express.Router();
const filmeRepository = AppDataSource.getRepository(filmeEntity);


route.post("/", async (req, res) => {
  const { nome, genero, ano } = req.body;

  if (!nome || nome.length < 1) {
    return res.status(400).send({ response: "O nome do filme é obrigatório!" });
  }

  if (!genero || genero.length < 1) {
    return res.status(400).send({ response: "O gênero do filme é obrigatório!" });
  }

  if (!ano) {
    return res.status(400).send({ response: "O ano do filme é obrigatório!" });
  }

  const newFilme = filmeRepository.create({ nome, genero, ano });

  try {
    await filmeRepository.save(newFilme);
    return res.status(201).send({
      response: `O filme ${nome} foi cadastrado com sucesso!`
    });
  } catch (err) {
    return res.status(500).send({ response: `Houve um erro: ${err}` });
  }
});


route.get("/", async (req, res) => {
  try {
    const filmes = await filmeRepository.find();
    return res.status(200).send({ response: filmes });
  } catch (err) {
    return res.status(500).send({ response: `Houve um erro: ${err}` });
  }
});

route.put("/", async (req, res) => {
  const { id, nome, genero, ano } = req.body;

  if (!id) {
    return res.status(400).send({ response: "O ID do filme é obrigatório!" });
  }

  try {
    await filmeRepository.update(id, { nome, genero, ano });
    return res.status(200).send({ response: "Filme atualizado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ response: `Houve um erro: ${err}` });
  }
});


route.delete("/:idFilme", async (req, res) => {
  const { idFilme } = req.params;

  try {
    await filmeRepository.delete(idFilme);
    return res.status(200).send({ response: "Filme deletado com sucesso!" });
  } catch (err) {
    return res.status(500).send({ response: `Houve um erro: ${err}` });
  }
});

export default route;
