import { ServerError } from '.';
import { BackEndAbstract } from './BackEndAbstarct';

export class Album extends BackEndAbstract {
  readonly route = '/api/albums';
  readonly tableName = 'albums';
  readonly requiredFields = ['title', 'description', 'videos'];

  constructor() {
    super();
  }

  validate(data: any) {
    for (const key of this.requiredFields) {
      if (!data[key]) {
        throw new ServerError(400, `Property "${key}" is required`);
      }
    }

    for (const key of Object.keys(data)) {
      if (!this.requiredFields.includes(key)) {
        throw new ServerError(
          400,
          `Unknown property "${key}". You can only use one of the following: "${this.requiredFields.join('", "')}"`,
        );
      }
    }
  }
}
