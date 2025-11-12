import { EntitySchema } from "typeorm";

const assistidos = new EntitySchema({
  name: "Assistidos",
  tableName: "Assistidos",
  columns: {
    id: { primary: true, type: "int", generated: "increment" },
    createdAt: { type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP" },
  },
  relations: {
    usuario: {
      target: "User",
      type: "many-to-one",
      joinColumn: true,
    },
    filme: {
      target: "Filmes",
      type: "many-to-one",
      joinColumn: true,
    },
  },
});

export default assistidos;