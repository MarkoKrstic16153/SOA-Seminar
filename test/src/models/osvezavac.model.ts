import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Osvezavac extends Model {
  @property({
    type: 'number',
    required: true,
    default: 10,
  })
  MinVlaznost: number;

  @property({
    type: 'number',
    required: true,
    default: 100,
  })
  MaxVlaznost: number;

  @property({
    type: 'number',
    required: true,
    default: 50,
  })
  SrednjaVlaznost: number;

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

  constructor(data?: Partial<Osvezavac>) {
    super(data);
  }
}

export interface OsvezavacRelations {
  // describe navigational properties here
}

export type OsvezavacWithRelations = Osvezavac & OsvezavacRelations;
