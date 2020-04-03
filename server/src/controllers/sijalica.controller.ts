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
import {Sijalica} from '../models';
import {SijalicaRepository} from '../repositories';

export class SijalicaController {
  axios: any = require('axios');
  constructor(
    @repository(SijalicaRepository)
    public sijalicaRepository: SijalicaRepository,
  ) {}

  @post('/sijalicas', {
    responses: {
      '200': {
        description: 'Sijalica model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sijalica)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sijalica, {
            title: 'NewSijalica',
            exclude: ['id'],
          }),
        },
      },
    })
    sijalica: Omit<Sijalica, 'id'>,
  ): Promise<Sijalica> {
    return this.sijalicaRepository.create(sijalica);
  }

  @get('/sijalicas/count', {
    responses: {
      '200': {
        description: 'Sijalica model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Sijalica) where?: Where<Sijalica>): Promise<Count> {
    return this.sijalicaRepository.count(where);
  }

  @get('/sijalicas', {
    responses: {
      '200': {
        description: 'Array of Sijalica model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Sijalica, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Sijalica) filter?: Filter<Sijalica>,
  ): Promise<Sijalica[]> {
    return this.sijalicaRepository.find(filter);
  }

  @patch('/sijalicas', {
    responses: {
      '200': {
        description: 'Sijalica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sijalica, {partial: true}),
        },
      },
    })
    sijalica: Sijalica,
    @param.where(Sijalica) where?: Where<Sijalica>,
  ): Promise<Count> {
    return this.sijalicaRepository.updateAll(sijalica, where);
  }

  @get('/sijalicas/{id}', {
    responses: {
      '200': {
        description: 'Sijalica model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sijalica, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Sijalica, {exclude: 'where'})
    filter?: FilterExcludingWhere<Sijalica>,
  ): Promise<Sijalica> {
    return this.sijalicaRepository.findById(id, filter);
  }

  @patch('/sijalicas/{id}', {
    responses: {
      '204': {
        description: 'Sijalica PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sijalica, {partial: true}),
        },
      },
    })
    sijalica: Sijalica,
  ): Promise<void> {
    await this.sijalicaRepository.updateById(id, sijalica);
  }

  @put('/sijalicas/{id}', {
    responses: {
      '204': {
        description: 'Sijalica PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sijalica: Sijalica,
  ): Promise<void> {
    await this.sijalicaRepository.replaceById(id, sijalica);
  }

  @del('/sijalicas/{id}', {
    responses: {
      '204': {
        description: 'Sijalica DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sijalicaRepository.deleteById(id);
  }

  @get('/sijalicas/ukljuci', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ukluci se!'}},
      },
    },
  })
  ukljuciTv(): String {
    this.axios.get('http://localhost:3016/upali');
    return 'SIjalica Ukljucen';
  }

  @get('/sijalicas/ugasi', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ugasi se!'}},
      },
    },
  })
  ugasiTv(): String {
    this.axios.get('http://localhost:3016/ugasi/');

    return 'sijalica Ugasen';
  }
}
