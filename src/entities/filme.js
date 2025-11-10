const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Filme",
  tableName: "filmes",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    titulo: {
      type: String,
      length: 100
    },
    genero: {
      type: String,
      length: 50
    },
    ano: {
      type: Number
    }
  }
});
