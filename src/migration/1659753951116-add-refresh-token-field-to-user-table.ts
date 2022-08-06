import { MigrationInterface, QueryRunner } from "typeorm";

export class addRefreshTokenFieldToUserTable1659753951116 implements MigrationInterface {
    name = 'addRefreshTokenFieldToUserTable1659753951116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
    }

}
