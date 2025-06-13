import { MigrationInterface, QueryRunner } from 'typeorm';

export class CompanyAddress1749838088610 implements MigrationInterface {
  name = 'CompanyAddress1749838088610';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`CompanyCordinates\` (\`createdBy\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(255) NULL, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updateCount\` int NOT NULL DEFAULT '1', \`id\` varchar(36) NOT NULL, \`lat\` float NOT NULL, \`lng\` float NOT NULL, \`addressId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`CompanyAddresses\` (\`createdBy\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(255) NULL, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updateCount\` int NOT NULL DEFAULT '1', \`id\` varchar(36) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`stateCode\` varchar(255) NOT NULL, \`postalCode\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`CompanyAddresses\``);
    await queryRunner.query(`DROP TABLE \`CompanyCordinates\``);
  }
}
