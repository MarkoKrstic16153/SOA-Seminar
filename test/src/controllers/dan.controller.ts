import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Dan} from '../models';
import {DanRepository} from '../repositories';

export class DanController {
  constructor(
    @repository(DanRepository)
    public danRepository : DanRepository,
  ) {}

  @post('/dans', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dan)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dan, {
            title: 'NewDan',
            
          }),
        },
      },
    })
    dan: Dan,
  ): Promise<Dan> {
    return this.danRepository.create(dan);
  }

  @get('/dans/count', {
    responses: {
      '200': {
        description: 'Dan model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Dan) where?: Where<Dan>,
  ): Promise<Count> {
    return this.danRepository.count(where);
  }

  @get('/dans', {
    responses: {
      '200': {
        description: 'Array of Dan model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Dan, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Dan) filter?: Filter<Dan>,
  ): Promise<Dan[]> {
    return this.danRepository.find(filter);
  }

  @patch('/dans', {
    responses: {
      '200': {
        description: 'Dan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dan, {partial: true}),
        },
      },
    })
    dan: Dan,
    @param.where(Dan) where?: Where<Dan>,
  ): Promise<Count> {
    return this.danRepository.updateAll(dan, where);
  }

  @get('/dans/{id}', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Dan, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Dan, {exclude: 'where'}) filter?: FilterExcludingWhere<Dan>
  ): Promise<Dan> {
    return this.danRepository.findById(id, filter);
  }

  @patch('/dans/{id}', {
    responses: {
      '204': {
        description: 'Dan PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dan, {partial: true}),
        },
      },
    })
    dan: Dan,
  ): Promise<void> {
    await this.danRepository.updateById(id, dan);
  }

  @put('/dans/{id}', {
    responses: {
      '204': {
        description: 'Dan PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dan: Dan,
  ): Promise<void> {
    await this.danRepository.replaceById(id, dan);
  }

  @del('/dans/{id}', {
    responses: {
      '204': {
        description: 'Dan DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.danRepository.deleteById(id);
  }
}
