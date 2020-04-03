import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Preciscavac extends Entity {
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
  MinZag: number;

  @property({
    type: 'number',
    required: true,
  })
  MaxZag: number;

  @property({
    type: 'number',
    required: true,
  })
  Zag: number;

  @property({
    type: 'number',
    required: true,
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
