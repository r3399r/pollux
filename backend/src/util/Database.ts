import 'reflect-metadata';
import 'pg';
import { injectable, multiInject } from 'inversify';
import { DataSource, QueryRunner } from 'typeorm';

export const dbEntitiesBindingId = Symbol('DbEntities');
/**
 * Database manager class
 */
@injectable()
export class Database {
  private dataSource: DataSource | undefined = undefined;
  private queryRunner: QueryRunner | undefined = undefined;

  @multiInject(dbEntitiesBindingId)
  private readonly entities!: Function[];

  private createDataSource() {
    if (this.dataSource === undefined)
      this.dataSource = new DataSource({
        type: 'cockroachdb',
        host: process.env.DB_HOST,
        port: 26257,
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: `${process.env.DB_CLUSTER}.${process.env.PROJECT}`,
        ssl: true,
        extra: {
          options: `--cluster=${process.env.DB_CLUSTER}`,
        },
        entities: this.entities,
        synchronize: false,
        logging: false,
      });

    return this.dataSource;
  }

  private async getConnection() {
    const ds = this.createDataSource();
    if (ds.isInitialized) return ds;

    return await ds.initialize();
  }

  public async getQueryRunner() {
    if (this.queryRunner === undefined || this.queryRunner.isReleased) {
      const connection = await this.getConnection();
      this.queryRunner = connection.createQueryRunner();
    }
    await this.queryRunner.connect();

    return this.queryRunner;
  }

  public async cleanUp() {
    const qr = await this.getQueryRunner();
    await qr.release();
    await this.dataSource?.destroy();
  }
}
