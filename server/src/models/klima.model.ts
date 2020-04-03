import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Klima extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  MinTemp: number;

  @property({
    type: 'number',
    required: true,
  })
  MaxValue: number;

  @property({
    type: 'number',
    required: true,
  })
  Temp: number;

  @property({
    type: 'number',
    required: true,
  })
  Potrosnja: number;

  @property({
    type: 'number',
    required: true,
  })
  VremeRada: number;

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
