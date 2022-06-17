// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
const API_URL = "http://example.com";

/**
 * The options used to configure the API.
 */
export interface ClientConfig {
  /**
   * The URL of the client.
   */
  id: number;

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
export const DEFAULT_CLIENT_CONFIG: ClientConfig = {
  id: 1,
  url: API_URL || "https://jsonplaceholder.typicode.com",
  timeout: 30000,
};
