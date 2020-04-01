import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Preciscavac extends Model {
  @property({
    type: 'number',
    required: true,
    default: 10,
  })
  MinZagadjenost: number;

  @property({
    type: 'number',
    required: true,
    default: 250,
  })
  MaxZagadjenost: number;

  @property({
    type: 'number',
    required: true,
    default: 75,
  })
  SrednjaZagadjenost: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  VremeRada: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Preciscavac>) {
    super(data);
  }
}

export interface PreciscavacRelations {
  // describe navigational properties here
}

export type PreciscavacWithRelations = Preciscavac & PreciscavacRelations;
