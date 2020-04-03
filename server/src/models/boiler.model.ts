import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Boiler extends Entity {
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
  Potrosnja: number;

  @property({
    type: 'number',
    required: true,
  })
  VremeRada: number;

  @property({
    type: 'number',
    required: true,
  })
  Voda: number;

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
