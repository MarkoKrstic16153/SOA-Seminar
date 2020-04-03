import {DefaultCrudRepository} from '@loopback/repository';
import {Preciscavac, PreciscavacRelations} from '../models';
import {PreciscavacDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PreciscavacRepository extends DefaultCrudRepository<
  Preciscavac,
  typeof Preciscavac.prototype.id,
  PreciscavacRelations
> {
  constructor(
    @inject('datasources.Preciscavac') dataSource: PreciscavacDataSource,
  ) {
    super(Preciscavac, dataSource);
  }
}
