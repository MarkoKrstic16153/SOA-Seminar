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
import {Osvezavac} from '../models';
import {OsvezavacRepository} from '../repositories';

export class OsvezavacController {
  axios: any = require('axios');
  constructor(
    @repository(OsvezavacRepository)
    public osvezavacRepository: OsvezavacRepository,
  ) {}

  @post('/osvezavacs', {
    responses: {
      '200': {
        description: 'Osvezavac model instance',
        content: {'application/json': {schema: getModelSchemaRef(Osvezavac)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Osvezavac, {
            title: 'NewOsvezavac',
            exclude: ['id'],
          }),
        },
      },
    })
    osvezavac: Omit<Osvezavac, 'id'>,
  ): Promise<Osvezavac> {
    return this.osvezavacRepository.create(osvezavac);
  }

  @get('/osvezavacs/count', {
    responses: {
      '200': {
        description: 'Osvezavac model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Osvezavac) where?: Where<Osvezavac>,
  ): Promise<Count> {
    return this.osvezavacRepository.count(where);
  }

  @get('/osvezavacs', {
    responses: {
      '200': {
        description: 'Array of Osvezavac model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Osvezavac, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Osvezavac) filter?: Filter<Osvezavac>,
  ): Promise<Osvezavac[]> {
    return this.osvezavacRepository.find(filter);
  }

  @patch('/osvezavacs', {
    responses: {
      '200': {
        description: 'Osvezavac PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Osvezavac, {partial: true}),
        },
      },
    })
    osvezavac: Osvezavac,
    @param.where(Osvezavac) where?: Where<Osvezavac>,
  ): Promise<Count> {
    return this.osvezavacRepository.updateAll(osvezavac, where);
  }

  @get('/osvezavacs/{id}', {
    responses: {
      '200': {
        description: 'Osvezavac model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Osvezavac, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Osvezavac, {exclude: 'where'})
    filter?: FilterExcludingWhere<Osvezavac>,
  ): Promise<Osvezavac> {
    return this.osvezavacRepository.findById(id, filter);
  }

  @patch('/osvezavacs/{id}', {
    responses: {
      '204': {
        description: 'Osvezavac PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Osvezavac, {partial: true}),
        },
      },
    })
    osvezavac: Osvezavac,
  ): Promise<void> {
    await this.osvezavacRepository.updateById(id, osvezavac);
  }

  @put('/osvezavacs/{id}', {
    responses: {
      '204': {
        description: 'Osvezavac PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() osvezavac: Osvezavac,
  ): Promise<void> {
    await this.osvezavacRepository.replaceById(id, osvezavac);
  }

  @del('/osvezavacs/{id}', {
    responses: {
      '204': {
        description: 'Osvezavac DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.osvezavacRepository.deleteById(id);
  }

  @get('/osvezavacs/ukljuci/{temp}', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ukluci se!'}},
      },
    },
  })
  ukljuciOsvezavac(@param.path.number('temp') temp: number): String {
    console.log(temp);
    this.axios.get('http://localhost:3002/upali/' + temp);
    return 'Osvezavacs Ukljucena';
  }

  @get('/osvezavacs/ugasi', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ugasi se!'}},
      },
    },
  })
  ugasiTv(): String {
    this.axios.get('http://localhost:3002/ugasi/');

    return 'Osvezavac Ugasen';
  }
}
