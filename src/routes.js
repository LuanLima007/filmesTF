import express from "express";
import userController from "./controllers/userController.js";
import generoController from "./controllers/generoController.js";
import filmeController from "./controllers/filmeController.js";
import assistidosController from "./controllers/assistidosController.js";

const routes = express();

routes.use("/user", userController);
routes.use("/filme", filmeController);
routes.use("/genero", generoController);
routes.use("/assistidos", assistidosController);

export default routes;
