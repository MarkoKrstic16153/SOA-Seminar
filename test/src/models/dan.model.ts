import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Dan extends Entity {
  @property({
    type: 'date',
    id: true,
    generated: false,
    required: true,
  })
  Datum: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  UkupnaPotrosnja: number;

  @property({
    type: 'object',
    required: true,
  })
  tv: object;

  @property({
    type: 'object',
    required: true,
  })
  sijalice: object;

  @property({
    type: 'object',
    required: true,
  })
  preciscavac: object;

  @property({
    type: 'object',
    required: true,
  })
  osvezavac: object;

  @property({
    type: 'object',
    required: true,
  })
  klima: object;

  @property({
    type: 'object',
    required: true,
  })
  boiler: object;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Dan>) {
    super(data);
  }
}

export interface DanRelations {
  // describe navigational properties here
}

export type DanWithRelations = Dan & DanRelations;
