import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Tv extends Model {
  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  VremeRada: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  Potrosnja: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tv>) {
    super(data);
  }
}

export interface TvRelations {
  // describe navigational properties here
}

export type TvWithRelations = Tv & TvRelations;
