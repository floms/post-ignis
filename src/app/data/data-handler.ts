import {DataProvider} from './data-provider';

export abstract class DataHandler {
  protected readonly provider = new DataProvider(this.db());

  abstract db(): string;

  add(record: any) {
    return this.provider.save(record);
  }

  remove(environment: any) {
    return this.provider.delete(environment);
  }

  update(record: any) {
    return this.provider.update(record);
  }

  destroy() {
    this.provider.destroy();
  }

  all() {
    return this.provider.all();
  }
}
