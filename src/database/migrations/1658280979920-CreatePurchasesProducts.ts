import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePurchasesProducts1658280979920 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'purchases_items',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'purchase_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'product_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'amount',
              type: 'integer',
            },
            {
              name: 'total_price',
              type: 'decimal',
            },
          ],
          foreignKeys: [
            {
              name: "fk_purchase_purchases_items",
              referencedTableName: "purchases",
              referencedColumnNames: ["id"],
              columnNames: ["purchase_id"],
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            },
            {
              name: "fk_product_purchases_items",
              referencedTableName: "products",
              referencedColumnNames: ["id"],
              columnNames: ["product_id"],
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
            },
          ],
        }),
      );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('purchases_items');
    }

}
