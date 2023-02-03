import pgPromise from 'pg-promise';
import { camelizeColumns, IClient } from './funtionConnection';

export const opcionesPG: pgPromise.IInitOptions<IClient> = {
  receive(data, result, e) { camelizeColumns(data); }
};
