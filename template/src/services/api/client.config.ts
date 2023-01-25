// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
const API_URL_TYPICODE = 'https://jsonplaceholder.typicode.com';

const API_URL_HEROKUAPP = 'https://api-nodejs-todolist.herokuapp.com';

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
  url: API_URL_TYPICODE,
  timeout: 30000,
};

export const HEROKUAPP_CLIENT_CONFIG: ClientConfig = {
  id: 'HEROKUAPP',
  url: API_URL_HEROKUAPP,
  timeout: 30000,
};
