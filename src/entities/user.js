const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Usuario",
  tableName: "usuarios",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    nome: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    }
  }
});
