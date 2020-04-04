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
import {Preciscavac} from '../models';
import {PreciscavacRepository} from '../repositories';

export class PreciscavacController {
  axios: any = require('axios');
  constructor(
    @repository(PreciscavacRepository)
    public preciscavacRepository: PreciscavacRepository,
  ) {}

  @post('/preciscavacs', {
    responses: {
      '200': {
        description: 'Preciscavac model instance',
        content: {'application/json': {schema: getModelSchemaRef(Preciscavac)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preciscavac, {
            title: 'NewPreciscavac',
            exclude: ['id'],
          }),
        },
      },
    })
    preciscavac: Omit<Preciscavac, 'id'>,
  ): Promise<Preciscavac> {
    return this.preciscavacRepository.create(preciscavac);
  }

  @get('/preciscavacs/count', {
    responses: {
      '200': {
        description: 'Preciscavac model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Preciscavac) where?: Where<Preciscavac>,
  ): Promise<Count> {
    return this.preciscavacRepository.count(where);
  }

  @get('/preciscavacs', {
    responses: {
      '200': {
        description: 'Array of Preciscavac model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Preciscavac, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Preciscavac) filter?: Filter<Preciscavac>,
  ): Promise<Preciscavac[]> {
    return this.preciscavacRepository.find(filter);
  }

  @patch('/preciscavacs', {
    responses: {
      '200': {
        description: 'Preciscavac PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preciscavac, {partial: true}),
        },
      },
    })
    preciscavac: Preciscavac,
    @param.where(Preciscavac) where?: Where<Preciscavac>,
  ): Promise<Count> {
    return this.preciscavacRepository.updateAll(preciscavac, where);
  }

  @get('/preciscavacs/{id}', {
    responses: {
      '200': {
        description: 'Preciscavac model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Preciscavac, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Preciscavac, {exclude: 'where'})
    filter?: FilterExcludingWhere<Preciscavac>,
  ): Promise<Preciscavac> {
    return this.preciscavacRepository.findById(id, filter);
  }

  @patch('/preciscavacs/{id}', {
    responses: {
      '204': {
        description: 'Preciscavac PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preciscavac, {partial: true}),
        },
      },
    })
    preciscavac: Preciscavac,
  ): Promise<void> {
    await this.preciscavacRepository.updateById(id, preciscavac);
  }

  @put('/preciscavacs/{id}', {
    responses: {
      '204': {
        description: 'Preciscavac PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() preciscavac: Preciscavac,
  ): Promise<void> {
    await this.preciscavacRepository.replaceById(id, preciscavac);
  }

  @del('/preciscavacs/{id}', {
    responses: {
      '204': {
        description: 'Preciscavac DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.preciscavacRepository.deleteById(id);
  }

  @get('/preciscavacs/ukljuci', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ukluci se!'}},
      },
    },
  })
  ukljuciTv() {
    this.axios.get('http://localhost:3003/upali');
  }

  @get('/preciscavacs/ugasi', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ugasi se!'}},
      },
    },
  })
  ugasiTv() {
    this.axios.get('http://localhost:3003/ugasi/');
  }
}
