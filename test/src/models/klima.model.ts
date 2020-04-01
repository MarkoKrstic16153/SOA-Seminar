import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Klima extends Model {
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

  @property({
    type: 'number',
    required: true,
    default: 10,
  })
  Temperatura: number;

  @property({
    type: 'number',
    required: true,
    default: 35,
  })
  MaxTemperatura: number;

  @property({
    type: 'number',
    required: true,
    default: 10,
  })
  MinTemperatura: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Klima>) {
    super(data);
  }
}

export interface KlimaRelations {
  // describe navigational properties here
}

export type KlimaWithRelations = Klima & KlimaRelations;
