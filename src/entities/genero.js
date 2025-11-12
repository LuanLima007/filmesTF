import { EntitySchema } from "typeorm";

const genero = new EntitySchema({
  name: "Generos",
  tableName: "Generos",
  columns: {
    id: { primary: true, type: "int", generated: "increment" },
    nome: { type: "varchar", length: 100, nullable: false },
    createdAt: {
      type: "datetime",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});

export default genero;
