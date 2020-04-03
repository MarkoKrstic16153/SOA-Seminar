import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Sijalica extends Entity {
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
  VremeRada: number;

  @property({
    type: 'number',
    required: true,
  })
  Potrosnja: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Sijalica>) {
    super(data);
  }
}

export interface SijalicaRelations {
  // describe navigational properties here
}

export type SijalicaWithRelations = Sijalica & SijalicaRelations;
