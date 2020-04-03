import {DefaultCrudRepository} from '@loopback/repository';
import {Tv, TvRelations} from '../models';
import {TvDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TvRepository extends DefaultCrudRepository<
  Tv,
  typeof Tv.prototype.id,
  TvRelations
> {
  constructor(
    @inject('datasources.Tv') dataSource: TvDataSource,
  ) {
    super(Tv, dataSource);
  }
}
