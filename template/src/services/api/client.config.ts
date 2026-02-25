import env from '@/config/env';

/**
 * The options used to configure the API.
 */
export interface ClientConfig {
  /**
   * The id of the client.
   */
  id: 'HEROKUAPP' | 'TYPICODE';

  /**
   * The URL of the client.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * The default configuration for the app.
 */

export const TYPICODE_CLIENT_CONFIG: ClientConfig = {
  id: 'TYPICODE',
  url: env.API_URL_TYPICODE,
  timeout: 30000,
};

export const HEROKUAPP_CLIENT_CONFIG: ClientConfig = {
  id: 'HEROKUAPP',
  url: env.API_URL_HEROKUAPP,
  timeout: 30000,
};
