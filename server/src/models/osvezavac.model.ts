import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Osvezavac extends Entity {
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
  MinVlaz: number;

  @property({
    type: 'number',
    required: true,
  })
  MaxVlaz: number;

  @property({
    type: 'number',
    required: true,
  })
  Vlaz: number;

  @property({
    type: 'number',
    required: true,
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
