import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomers1658277731412 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'customers',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'status',
              type: 'varchar',
            },
            {
              name: 'cnpj_cpf',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'address',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
            },
            {
              name: 'obs',
              type: 'varchar',
            },
            {
              name: 'logo',
              type: 'varchar',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('customers');
    }
}
