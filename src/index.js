require("reflect-metadata");
const express = require("express");
const AppDataSource = require("./data-source");

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado!");

    const filmeRepository = AppDataSource.getRepository("Filme");

    // Listar todos os filmes
    app.get("/filmes", async (req, res) => {
      const filmes = await filmeRepository.find();
      res.json(filmes);
    });

    // Criar um filme
    app.post("/filmes", async (req, res) => {
      const novo = filmeRepository.create(req.body);
      const salvo = await filmeRepository.save(novo);
      res.json(salvo);
    });

    // Atualizar um filme
    app.put("/filmes/:id", async (req, res) => {
      const { id } = req.params;
      await filmeRepository.update(id, req.body);
      res.json({ message: "Filme atualizado!" });
    });

    // Deletar um filme
    app.delete("/filmes/:id", async (req, res) => {
      const { id } = req.params;
      await filmeRepository.delete(id);
      res.json({ message: "Filme deletado!" });
    });

    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch((err) => console.error("Erro ao conectar:", err));
