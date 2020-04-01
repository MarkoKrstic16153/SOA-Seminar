import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Boiler extends Model {
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
    default: 20,
  })
  TemperaturaVode: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Boiler>) {
    super(data);
  }
}

export interface BoilerRelations {
  // describe navigational properties here
}

export type BoilerWithRelations = Boiler & BoilerRelations;
