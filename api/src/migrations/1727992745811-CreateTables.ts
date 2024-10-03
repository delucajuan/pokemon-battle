import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1727992745811 implements MigrationInterface {
  name = 'CreateTables1727992745811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "battle_result" ("id" varchar PRIMARY KEY NOT NULL, "winnerId" integer NOT NULL, "battleDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "attackerId" varchar, "defenderId" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_battle_result" ("id" varchar PRIMARY KEY NOT NULL, "winnerId" integer NOT NULL, "battleDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "attackerId" varchar, "defenderId" varchar, CONSTRAINT "FK_64e0f79e37bb63827d7382bfc71" FOREIGN KEY ("attackerId") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_aabd248b9eae7d80c574694e156" FOREIGN KEY ("defenderId") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_battle_result"("id", "winnerId", "battleDate", "attackerId", "defenderId") SELECT "id", "winnerId", "battleDate", "attackerId", "defenderId" FROM "battle_result"`,
    );
    await queryRunner.query(`DROP TABLE "battle_result"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_battle_result" RENAME TO "battle_result"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "battle_result" RENAME TO "temporary_battle_result"`,
    );
    await queryRunner.query(
      `CREATE TABLE "battle_result" ("id" varchar PRIMARY KEY NOT NULL, "winnerId" integer NOT NULL, "battleDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "attackerId" varchar, "defenderId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "battle_result"("id", "winnerId", "battleDate", "attackerId", "defenderId") SELECT "id", "winnerId", "battleDate", "attackerId", "defenderId" FROM "temporary_battle_result"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_battle_result"`);
    await queryRunner.query(`DROP TABLE "battle_result"`);
    await queryRunner.query(`DROP TABLE "pokemon"`);
  }
}
