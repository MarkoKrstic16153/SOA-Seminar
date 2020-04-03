import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Klima} from '../models';
import {KlimaRepository} from '../repositories';

export class KlimaController {
  axios: any = require('axios');
  constructor(
    @repository(KlimaRepository)
    public klimaRepository: KlimaRepository,
  ) {}

  @post('/klimas', {
    responses: {
      '200': {
        description: 'Klima model instance',
        content: {'application/json': {schema: getModelSchemaRef(Klima)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Klima, {
            title: 'NewKlima',
            exclude: ['id'],
          }),
        },
      },
    })
    klima: Omit<Klima, 'id'>,
  ): Promise<Klima> {
    return this.klimaRepository.create(klima);
  }

  @get('/klimas/count', {
    responses: {
      '200': {
        description: 'Klima model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Klima) where?: Where<Klima>): Promise<Count> {
    return this.klimaRepository.count(where);
  }

  @get('/klimas', {
    responses: {
      '200': {
        description: 'Array of Klima model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Klima, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Klima) filter?: Filter<Klima>): Promise<Klima[]> {
    return this.klimaRepository.find(filter);
  }

  @patch('/klimas', {
    responses: {
      '200': {
        description: 'Klima PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Klima, {partial: true}),
        },
      },
    })
    klima: Klima,
    @param.where(Klima) where?: Where<Klima>,
  ): Promise<Count> {
    return this.klimaRepository.updateAll(klima, where);
  }

  @get('/klimas/{id}', {
    responses: {
      '200': {
        description: 'Klima model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Klima, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Klima, {exclude: 'where'})
    filter?: FilterExcludingWhere<Klima>,
  ): Promise<Klima> {
    return this.klimaRepository.findById(id, filter);
  }

  @patch('/klimas/{id}', {
    responses: {
      '204': {
        description: 'Klima PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Klima, {partial: true}),
        },
      },
    })
    klima: Klima,
  ): Promise<void> {
    await this.klimaRepository.updateById(id, klima);
  }

  @put('/klimas/{id}', {
    responses: {
      '204': {
        description: 'Klima PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() klima: Klima,
  ): Promise<void> {
    await this.klimaRepository.replaceById(id, klima);
  }

  @del('/klimas/{id}', {
    responses: {
      '204': {
        description: 'Klima DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.klimaRepository.deleteById(id);
  }

  @get('/klimas/ukljuci/{temp}', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ukluci se!'}},
      },
    },
  })
  ukljuciKlimu(@param.path.number('temp') temp: number): String {
    console.log(temp);
    this.axios.get('http://localhost:3001/upali/' + temp);
    return 'Klima Ukljucena';
  }

  @get('/klimas/ugasi', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ugasi se!'}},
      },
    },
  })
  ugasiBoiler(): String {
    this.axios.get('http://localhost:3001/ugasi/');
    return 'Klima Ugasena';
  }
}
