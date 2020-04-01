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
import {
  Boiler,
  Dan,
  Klima,
  Osvezavac,
  Preciscavac,
  Sijalice,
  Tv,
} from '../models';
import {DanRepository} from '../repositories';

export class DanController {
  axios: any = require('axios');
  boiler: Boiler = new Boiler();
  tv: Tv = new Tv();
  sijalica: Sijalice = new Sijalice();
  preciscavac: Preciscavac = new Preciscavac();
  osvezavac: Osvezavac = new Osvezavac();
  klima: Klima = new Klima();
  constructor(
    @repository(DanRepository)
    public danRepository: DanRepository,
  ) {
    this.boiler.Potrosnja = 0;
    this.boiler.TemperaturaVode = 0;
    this.boiler.VremeRada = 0;
  }

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
    console.log(dan);
    return this.danRepository.create(dan);
  }

  @post('/dans/boiler', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Cao od LoopBack-a!'}},
      },
    },
  })
  obradiBoilerPodatke(
    @requestBody({
      content: {
        'application/json': {
          schema: {vremeRada: 0, vrednost: 0},
        },
      },
    })
    podaciBoiler: any,
  ): any {
    console.log(podaciBoiler);
    this.boiler.VremeRada = podaciBoiler.vremeRada;
    this.boiler.TemperaturaVode = podaciBoiler.vrednost;
    this.boiler.Potrosnja = this.boiler.VremeRada * 100;
    console.log(this.boiler);
    return 'Uspesno primio podatke sa boilera';
  }

  @post('/dans/klima', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Cao od LoopBack-a!'}},
      },
    },
  })
  obradiKlimaPodatke(
    @requestBody({
      content: {
        'application/json': {
          schema: {vremeRada: 0, vrednost: 0},
        },
      },
    })
    podaciKlima: any,
  ): any {
    console.log(podaciKlima);
    /*this.boiler.VremeRada = podaciBoiler.vremeRada;
    this.boiler.TemperaturaVode = podaciBoiler.vrednost;
    this.boiler.Potrosnja = this.boiler.VremeRada * 100;*/
    console.log(this.klima);
    return 'Uspesno primio podatke sa klime';
  }

  @post('/dans/preciscavac', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Cao od LoopBack-a!'}},
      },
    },
  })
  obradiPreciscavacPodatke(
    @requestBody({
      content: {
        'application/json': {
          schema: {vremeRada: 0, vrednost: 0},
        },
      },
    })
    podaciPreciscavac: any,
  ): any {
    console.log(podaciPreciscavac);
    /*this.boiler.VremeRada = podaciBoiler.vremeRada;
    this.boiler.TemperaturaVode = podaciBoiler.vrednost;
    this.boiler.Potrosnja = this.boiler.VremeRada * 100;*/
    console.log(this.preciscavac);
    return 'Uspesno primio podatke sa preciscavaca';
  }

  @post('/dans/vlaznost', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Cao od LoopBack-a!'}},
      },
    },
  })
  obradiVlaznostPodatke(
    @requestBody({
      content: {
        'application/json': {
          schema: {vremeRada: 0, vrednost: 0},
        },
      },
    })
    podaciVlaznost: any,
  ): any {
    console.log(podaciVlaznost);
    /*this.boiler.VremeRada = podaciBoiler.vremeRada;
    this.boiler.TemperaturaVode = podaciBoiler.vrednost;
    this.boiler.Potrosnja = this.boiler.VremeRada * 100;*/
    console.log(this.osvezavac);
    return 'Uspesno primio podatke sa osvezavaca';
  }

  @get('/dans/count', {
    responses: {
      '200': {
        description: 'Dan model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Dan) where?: Where<Dan>): Promise<Count> {
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
  async find(@param.filter(Dan) filter?: Filter<Dan>): Promise<Dan[]> {
    return this.danRepository.find(filter);
  }

  @get('/dans/ukljuciboiler/{temp}', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ukluci se!'}},
      },
    },
  })
  ukljuciBoiler(@param.path.number('temp') temp: number): String {
    console.log(temp);
    this.axios.get('http://localhost:3004/upali/' + temp);
    return 'Boiler Ukljucen';
  }

  @get('/dans/ukljuciklimu/{temp}', {
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

  @get('/dans/ukljucivlaznost/{temp}', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ukluci se!'}},
      },
    },
  })
  ukljuciVlaznost(@param.path.number('temp') temp: number): String {
    console.log(temp);
    this.axios.get('http://localhost:3002/upali/' + temp);
    return 'Vlaznost Ukljucena';
  }

  @get('/dans/ukljucizagadjenost', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ukluci se!'}},
      },
    },
  })
  ukljuciZagadjenost(): String {
    this.axios.get('http://localhost:3003/upali/');
    return 'Preciscavac Ukljucen';
  }

  @get('/dans/ukljucitv', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ukluci se!'}},
      },
    },
  })
  ukljuciTv(): String {
    //this.axios.get('http://localhost:3004/upali/' + temp);
    return 'Tv Ukljucen';
  }

  @get('/dans/ukljucisijalicu', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ukluci se!'}},
      },
    },
  })
  ukljuciSijalicu(): String {
    //this.axios.get('http://localhost:3004/upali/' + temp);
    return 'Sijalica Ukljucena';
  }

  @get('/dans/ugasiboiler', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ugasi se!'}},
      },
    },
  })
  ugasiBoiler(): String {
    this.axios.get('http://localhost:3004/ugasi/');
    return 'Boiler Ugasen';
  }

  @get('/dans/ugasiklimu', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ugasi se!'}},
      },
    },
  })
  ugasiKlimu(): String {
    this.axios.get('http://localhost:3001/ugasi/');
    return 'Klima Ugasena';
  }

  @get('/dans/ugasivlaznost', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ugasi se!'}},
      },
    },
  })
  ugasiVlaznost(): String {
    this.axios.get('http://localhost:3002/ugasi/');
    return 'Vlaznost Ugasena';
  }

  @get('/dans/ugasizagadjenost', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ugasi se!'}},
      },
    },
  })
  ugasiPreciscavac(): String {
    this.axios.get('http://localhost:3003/ugasi/');
    return 'Preciscavac Ugasen';
  }

  @get('/dans/ugasitv', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ugasi se!'}},
      },
    },
  })
  ugasiTv(): String {
    //this.axios.get('http://localhost:3004/ugasi/');
    return 'Tv Ugasen';
  }

  @get('/dans/ugasisijalicu', {
    responses: {
      '200': {
        description: 'Dan model instance',
        content: {'application/json': {telo: 'Ugasi se!'}},
      },
    },
  })
  ugasiSijalicu(): String {
    //this.axios.get('http://localhost:3004/ugasi/');
    return 'Sijalica Ugasena';
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
    @param.filter(Dan, {exclude: 'where'}) filter?: FilterExcludingWhere<Dan>,
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
