/* eslint no-console: 0 */  // --> OFF
import {BackEndAbstract, Route} from './back-end/api-classes/BackEndAbstarct';
import * as queryString from 'query-string';
import { Album, Video, Query, ServerError } from './back-end/api-classes';

export class API {
  private routes: {[key in Route]: BackEndAbstract} = {
    '/api/albums': new Album(),
    '/api/videos': new Video(),
  };

  async put(path: string, data: any) {
    const [route] = this.getParams(path);
    try {
      await this.errorRequest(route, data);
    } catch (error) {
      return this.errorRequest(route, data);
    }

    return await this.routes[route]?.create(data);
  }

  async get(path: string) {
    const [route, query] = this.getParams(path);
    return await this.routes[route]?.read(new Query(query));
  }

  async patch(path: string, data: any) {
    const [route] = this.getParams(path);
    try {
      if (!data.id) {
        throw new ServerError(400, 'Property "id" is required');
      }
    } catch (error) {
      return this.errorRequest(route, data);
    }
    return await this.routes[route]?.update(data);
  }

  async delete(path: string) {
    const [route, query] = this.getParams(path);
    return await this.routes[route]?.delete(new Query(query));
  }

  private getParams(route: string): [Route, Object] {
    const split = route.split('?');
    return [split[0] as Route, queryString.parse(split[1], {arrayFormat: 'comma'})];
  }

  private errorRequest(route: Route, data?: any): Promise<boolean> {
    return new Promise(((resolve, reject) => {
      if (!this.routes[route]) {
        reject(new ServerError(404, 'Not found'));
        throw new ServerError(404, 'Not found');
      }
      this.routes[route].validate(data);

      resolve(true);
    }));
  }
}

export default new API();
