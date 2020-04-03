import {DefaultCrudRepository} from '@loopback/repository';
import {Boiler, BoilerRelations} from '../models';
import {BoilerDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BoilerRepository extends DefaultCrudRepository<
  Boiler,
  typeof Boiler.prototype.id,
  BoilerRelations
> {
  constructor(
    @inject('datasources.Boiler') dataSource: BoilerDataSource,
  ) {
    super(Boiler, dataSource);
  }
}
