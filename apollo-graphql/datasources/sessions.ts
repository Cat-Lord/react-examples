import { DataSource, DataSourceConfig } from 'apollo-datasource';
import sessionData from '../data/sessions.json';

export class SessionAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<any>) {
  }

  getSessions() {
    return sessionData;
  }
}