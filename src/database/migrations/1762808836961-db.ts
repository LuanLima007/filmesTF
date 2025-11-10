import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1762808836961 implements MigrationInterface {
    name = 'Db1762808836961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`senha\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`nome\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`titulo\` \`titulo\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`genero\` \`genero\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`ano\` \`ano\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`ano\` \`ano\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`genero\` \`genero\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`filmes\` CHANGE \`titulo\` \`titulo\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`email\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`nome\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`senha\` varchar(100) NULL`);
    }

}
