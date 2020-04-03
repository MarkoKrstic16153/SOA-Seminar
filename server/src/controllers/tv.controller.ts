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
import {Tv} from '../models';
import {TvRepository} from '../repositories';

export class TvController {
  axios: any = require('axios');
  constructor(
    @repository(TvRepository)
    public tvRepository: TvRepository,
  ) {}

  @post('/tvs', {
    responses: {
      '200': {
        description: 'Tv model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tv)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tv, {
            title: 'NewTv',
            exclude: ['id'],
          }),
        },
      },
    })
    tv: Omit<Tv, 'id'>,
  ): Promise<Tv> {
    return this.tvRepository.create(tv);
  }

  @get('/tvs/count', {
    responses: {
      '200': {
        description: 'Tv model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Tv) where?: Where<Tv>): Promise<Count> {
    return this.tvRepository.count(where);
  }

  @get('/tvs', {
    responses: {
      '200': {
        description: 'Array of Tv model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Tv, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Tv) filter?: Filter<Tv>): Promise<Tv[]> {
    return this.tvRepository.find(filter);
  }

  @get('/tvs/{id}', {
    responses: {
      '200': {
        description: 'Tv model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tv, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tv, {exclude: 'where'}) filter?: FilterExcludingWhere<Tv>,
  ): Promise<Tv> {
    return this.tvRepository.findById(id, filter);
  }

  @patch('/tvs/{id}', {
    responses: {
      '204': {
        description: 'Tv PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tv, {partial: true}),
        },
      },
    })
    tv: Tv,
  ): Promise<void> {
    await this.tvRepository.updateById(id, tv);
  }

  @put('/tvs/{id}', {
    responses: {
      '204': {
        description: 'Tv PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tv: Tv,
  ): Promise<void> {
    await this.tvRepository.replaceById(id, tv);
  }

  @del('/tvs/{id}', {
    responses: {
      '204': {
        description: 'Tv DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tvRepository.deleteById(id);
  }

  @get('/tvs/ukljucitv', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ukluci se!'}},
      },
    },
  })
  ukljuciTv(): String {
    this.axios.get('http://localhost:3011/upali');
    return 'Tv Ukljucen';
  }

  @get('/tvs/ugasitv', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ugasi se!'}},
      },
    },
  })
  ugasiTv(): String {
    this.axios.get('http://localhost:3011/ugasi/');

    return 'Tv Ugasen';
  }
}
