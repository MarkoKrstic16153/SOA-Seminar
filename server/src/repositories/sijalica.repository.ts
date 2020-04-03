import {DefaultCrudRepository} from '@loopback/repository';
import {Sijalica, SijalicaRelations} from '../models';
import {SijalicaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SijalicaRepository extends DefaultCrudRepository<
  Sijalica,
  typeof Sijalica.prototype.id,
  SijalicaRelations
> {
  constructor(
    @inject('datasources.Sijalica') dataSource: SijalicaDataSource,
  ) {
    super(Sijalica, dataSource);
  }
}
