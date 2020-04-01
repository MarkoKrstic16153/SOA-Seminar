import {DefaultCrudRepository} from '@loopback/repository';
import {Dan, DanRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DanRepository extends DefaultCrudRepository<
  Dan,
  typeof Dan.prototype.Datum,
  DanRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Dan, dataSource);
  }
}
