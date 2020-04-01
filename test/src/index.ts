import {TestApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import { interval } from 'rxjs';
export {TestApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new TestApplication(options);
  await app.boot();
  await app.start();
  
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
