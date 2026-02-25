import envDev from './env.dev';
import envProd from './env.prod';

export type AppEnv = {
  API_URL_TYPICODE: string;
  API_URL_HEROKUAPP: string;
};

const env: AppEnv = __DEV__ ? envDev : envProd;

export default env;
