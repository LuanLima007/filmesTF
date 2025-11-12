import express from "express";
import assistidosEntity from '../entities/assistidos.js';
import { AppDataSource } from "../database/data-source.js";

const route = express.Router();
const assistidosRepository = AppDataSource.getRepository(assistidosEntity);


route.post("/", async (req, res) => {
    const { usuarioId, filmeId } = req.body;

    if (!usuarioId || !filmeId) {
        return res.status(400).send({
            response: "Usuário e filme são obrigatórios!"
        });
    }

    const newAssistido = assistidosRepository.create({
        usuario: { id: usuarioId },
        filme: { id: filmeId }
    });

    try {
        await assistidosRepository.save(newAssistido);
        return res.status(201).send({
            response: "Filme assistido cadastrado com sucesso!"
        });
    } catch (err) {
        return res.status(500).send({
            response: `Houve um erro: ${err}`
        });
    }
});


route.get("/", async (req, res) => {
    try {
        const assistidos = await assistidosRepository.find();
        return res.status(200).send({ response: assistidos });
    } catch (err) {
        return res.status(500).send({
            response: `Houve um erro: ${err}`
        });
    }
});


route.put("/", async (req, res) => {
    const { id, usuarioId, filmeId } = req.body;

    if (!id) {
        return res.status(400).send({
            response: "O ID do assistido é obrigatório para atualização!"
        });
    }

    try {
        await assistidosRepository.update(id, {
            usuario: { id: usuarioId },
            filme: { id: filmeId }
        });
        return res.status(200).send({
            response: "Dados atualizados com sucesso!"
        });
    } catch (err) {
        return res.status(500).send({
            response: `Houve um erro: ${err}`
        });
    }
});


route.delete("/:idAssistido", async (req, res) => {
    const { idAssistido } = req.params;

    try {
        await assistidosRepository.update(idAssistido, { deletedAt: new Date() });
        return res.status(200).send({
            response: "Filme assistido deletado com sucesso!"
        });
    } catch (err) {
        return res.status(500).send({
            response: `Houve um erro: ${err}`
        });
    }
});

export default route;
