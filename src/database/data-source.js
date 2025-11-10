const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "240193",
  database: "filmesdb",
  synchronize: false,
  logging: true,
  entities: [__dirname + "/entities/*.js"], // <-- Adiciona aqui
  migrations: [__dirname + "/migrations/*.js"],
});

AppDataSource.initialize()
  .then(() => console.log("Banco conectado!"))
  .catch(err => console.error("Erro na conexão:", err));

module.exports = AppDataSource;
