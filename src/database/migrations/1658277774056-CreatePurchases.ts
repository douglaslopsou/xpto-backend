import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePurchases1658277774056 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'purchases',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'purchase_date',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'total_price',
              type: 'decimal',
            },
            {
              name: 'customer_id',
              type: 'uuid',
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
          foreignKeys: [
            {
              name: "fk_customer_purchases",
              referencedTableName: "customers",
              referencedColumnNames: ["id"],
              columnNames: ["customer_id"],
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('purchases');
    }

}
