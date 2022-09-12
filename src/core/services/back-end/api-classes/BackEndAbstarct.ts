import { EntityAbstract } from 'shared/entities/EntityAbstract';
import Storage from '../Storage';
import { Query } from './Query';
import { ServerError } from './ServerError';

export type Route = '/api/albums' | '/api/videos';
export type Tablename = 'albums' | 'videos';

export abstract class BackEndAbstract {
  abstract readonly route: Route;
  abstract readonly tableName: Tablename;
  abstract readonly requiredFields: string[];

  constructor() {}

  async create<T>(data: T): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Storage.putValue(this.tableName, data);
  }

  async read<T, I extends number | undefined>(query: Query): Promise<I extends number ? T : T[]> {
    if (query.ids.length === 1) {
      return await Storage.getValue(this.tableName, query.ids[0]);
    }

    const values = await Storage.getAllValue(this.tableName);
    let filteredValues = values;

    if (query.ids.length) {
      filteredValues = filteredValues?.filter((value: EntityAbstract) => query?.ids?.includes(value.id));
    }

    return filteredValues.splice(query.offset, query.limit);
  }

  async update<T>(data: T): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Storage.putValue(this.tableName, data);
  }

  async delete(query: Query): Promise<any> {
    if (!query.ids.length) {
      return new Promise((resolve, reject) => {
        reject(new ServerError(400, 'Please provide ids you want to delete'));
        throw new ServerError(400, 'Please provide ids you want to delete');
      });
    }
    return Promise.all(
      query.ids.map((id) => {
        return Storage.deleteValue(this.tableName, id);
      }),
    );
  }
  abstract validate(data: object): void;
}
