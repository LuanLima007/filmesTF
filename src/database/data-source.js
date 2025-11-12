import { DataSource } from "typeorm";
import user from "../entities/user.js";
import genero from "../entities/genero.js";
import filme from "../entities/filme.js";
import assistidos from "../entities/assistidos.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Adm_34228881",
  database: "filmesdb",
  synchronize: false,
  logging: true,
  entities: [user, genero, filme, assistidos]
});
