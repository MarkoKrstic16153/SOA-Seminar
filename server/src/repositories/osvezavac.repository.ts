import {DefaultCrudRepository} from '@loopback/repository';
import {Osvezavac, OsvezavacRelations} from '../models';
import {OsvezavacDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OsvezavacRepository extends DefaultCrudRepository<
  Osvezavac,
  typeof Osvezavac.prototype.id,
  OsvezavacRelations
> {
  constructor(
    @inject('datasources.Osvezavac') dataSource: OsvezavacDataSource,
  ) {
    super(Osvezavac, dataSource);
  }
}
