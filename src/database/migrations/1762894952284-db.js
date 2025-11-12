/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1762894952284 {
    name = 'Db1762894952284'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`password\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`typeUser\` enum ('admin', 'comum') NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Generos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Assistidos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`usuarioId\` int NULL, \`filmeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`nome\` \`nome\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`genero\` \`genero\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`ano\` \`ano\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`Assistidos\` ADD CONSTRAINT \`FK_b24d153b5b36497cd3a1295b7bb\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Assistidos\` ADD CONSTRAINT \`FK_88ab1d8d5db148fc0295033a4bd\` FOREIGN KEY (\`filmeId\`) REFERENCES \`filmes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`Assistidos\` DROP FOREIGN KEY \`FK_88ab1d8d5db148fc0295033a4bd\``);
        await queryRunner.query(`ALTER TABLE \`Assistidos\` DROP FOREIGN KEY \`FK_b24d153b5b36497cd3a1295b7bb\``);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`createdAt\` \`createdAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`ano\` \`ano\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`genero\` \`genero\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`nome\` \`nome\` varchar(100) NULL`);
        await queryRunner.query(`DROP TABLE \`Assistidos\``);
        await queryRunner.query(`DROP TABLE \`Generos\``);
        await queryRunner.query(`DROP TABLE \`User\``);
    }
}
