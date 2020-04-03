import {DefaultCrudRepository} from '@loopback/repository';
import {Klima, KlimaRelations} from '../models';
import {KlimaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class KlimaRepository extends DefaultCrudRepository<
  Klima,
  typeof Klima.prototype.id,
  KlimaRelations
> {
  constructor(
    @inject('datasources.Klima') dataSource: KlimaDataSource,
  ) {
    super(Klima, dataSource);
  }
}
