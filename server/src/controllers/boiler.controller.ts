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
import {Boiler} from '../models';
import {BoilerRepository} from '../repositories';

export class BoilerController {
  axios: any = require('axios');
  constructor(
    @repository(BoilerRepository)
    public boilerRepository: BoilerRepository,
  ) {}

  @post('/boilers', {
    responses: {
      '200': {
        description: 'Boiler model instance',
        content: {'application/json': {schema: getModelSchemaRef(Boiler)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Boiler, {
            title: 'NewBoiler',
            exclude: ['id'],
          }),
        },
      },
    })
    boiler: Omit<Boiler, 'id'>,
  ): Promise<Boiler> {
    return this.boilerRepository.create(boiler);
  }

  @get('/boilers/count', {
    responses: {
      '200': {
        description: 'Boiler model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Boiler) where?: Where<Boiler>): Promise<Count> {
    return this.boilerRepository.count(where);
  }

  @get('/boilers', {
    responses: {
      '200': {
        description: 'Array of Boiler model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Boiler, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Boiler) filter?: Filter<Boiler>): Promise<Boiler[]> {
    return this.boilerRepository.find(filter);
  }

  @patch('/boilers', {
    responses: {
      '200': {
        description: 'Boiler PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Boiler, {partial: true}),
        },
      },
    })
    boiler: Boiler,
    @param.where(Boiler) where?: Where<Boiler>,
  ): Promise<Count> {
    return this.boilerRepository.updateAll(boiler, where);
  }

  @get('/boilers/{id}', {
    responses: {
      '200': {
        description: 'Boiler model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Boiler, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Boiler, {exclude: 'where'})
    filter?: FilterExcludingWhere<Boiler>,
  ): Promise<Boiler> {
    return this.boilerRepository.findById(id, filter);
  }

  @patch('/boilers/{id}', {
    responses: {
      '204': {
        description: 'Boiler PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Boiler, {partial: true}),
        },
      },
    })
    boiler: Boiler,
  ): Promise<void> {
    await this.boilerRepository.updateById(id, boiler);
  }

  @put('/boilers/{id}', {
    responses: {
      '204': {
        description: 'Boiler PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() boiler: Boiler,
  ): Promise<void> {
    await this.boilerRepository.replaceById(id, boiler);
  }

  @del('/boilers/{id}', {
    responses: {
      '204': {
        description: 'Boiler DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.boilerRepository.deleteById(id);
  }

  @get('/boilers/ukljuci/{temp}', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ukluci se!'}},
      },
    },
  })
  ukljuciBoiler(@param.path.number('temp') temp: number) {
    console.log(temp);
    this.axios.get('http://localhost:3004/upali/' + temp);
  }

  @get('/boilers/ugasi', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ugasi se!'}},
      },
    },
  })
  ugasiBoiler() {
    this.axios.get('http://localhost:3004/ugasi/');
  }
}
