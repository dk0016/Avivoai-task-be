import { MigrationInterface, QueryRunner } from 'typeorm';

export class Base1749808446036 implements MigrationInterface {
  name = 'Base1749808446036';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Cordinates\` (\`createdBy\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(255) NULL, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updateCount\` int NOT NULL DEFAULT '1', \`id\` varchar(36) NOT NULL, \`lat\` float NOT NULL, \`lng\` float NOT NULL, \`addressId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Companies\` (\`createdBy\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(255) NULL, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updateCount\` int NOT NULL DEFAULT '1', \`id\` varchar(36) NOT NULL, \`department\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`addressId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Addresses\` (\`createdBy\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(255) NULL, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updateCount\` int NOT NULL DEFAULT '1', \`id\` varchar(36) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`stateCode\` varchar(255) NOT NULL, \`postalCode\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Banks\` (\`createdBy\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(255) NULL, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updateCount\` int NOT NULL DEFAULT '1', \`id\` varchar(36) NOT NULL, \`cardExpire\` varchar(255) NOT NULL, \`cardNumber\` varchar(255) NOT NULL, \`cardType\` varchar(255) NOT NULL, \`currency\` varchar(255) NOT NULL, \`iban\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Hairs\` (\`createdBy\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(255) NULL, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updateCount\` int NOT NULL DEFAULT '1', \`id\` varchar(36) NOT NULL, \`color\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Cryptos\` (\`createdBy\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(255) NULL, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updateCount\` int NOT NULL DEFAULT '1', \`id\` varchar(36) NOT NULL, \`coin\` varchar(255) NOT NULL, \`wallet\` varchar(255) NOT NULL, \`network\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Users\` (\`createdBy\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(255) NULL, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updateCount\` int NOT NULL DEFAULT '1', \`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`maidenName\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`gender\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`birthDate\` date NOT NULL, \`image\` varchar(255) NOT NULL, \`bloodGroup\` varchar(255) NOT NULL, \`height\` float NOT NULL, \`weight\` float NOT NULL, \`eyeColor\` varchar(255) NOT NULL, \`ip\` varchar(255) NOT NULL, \`macAddress\` varchar(255) NOT NULL, \`university\` varchar(255) NOT NULL, \`ein\` varchar(255) NOT NULL, \`ssn\` varchar(255) NOT NULL, \`userAgent\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`addressId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`Users\``);
    await queryRunner.query(`DROP TABLE \`Cryptos\``);
    await queryRunner.query(`DROP TABLE \`Hairs\``);
    await queryRunner.query(`DROP TABLE \`Banks\``);
    await queryRunner.query(`DROP TABLE \`Addresses\``);
    await queryRunner.query(`DROP TABLE \`Companies\``);
    await queryRunner.query(`DROP TABLE \`Cordinates\``);
  }
}
