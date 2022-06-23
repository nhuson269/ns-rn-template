import { ApisauceInstance, create } from "apisauce";
import { ClientConfig } from "./client.config";
import RNFetchBlob from "rn-fetch-blob";
import { userDemoStore } from "stores";

export class Client {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  instance: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ClientConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ClientConfig) {
    this.config = config;
    this.instance = create({
      baseURL: config.url,
      timeout: config.timeout,
      headers: {
        Accept: "application/json",
      },
    });

    // Axios Interceptors
    const axiosInterceptors = this.instance.axiosInstance.interceptors;
    axiosInterceptors.request.use(
      requestConfig => {
        // Do something before request is sent
        if (!requestConfig.headers.Authorization) {
          requestConfig.headers.Authorization = `Bearer ${userDemoStore.getState().authToken?.accessToken}`;
        }
        return requestConfig;
      },
      error => {
        // Do something with request error
        return Promise.reject(error);
      },
    );
    axiosInterceptors.response.use(
      response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      },
    );
  }

  async upload(
    route: string,
    props?: {
      headers?: { [key: string]: string };
      body?: any;
      onLoading?: (written: number, total: number) => void;
      onSuccess?: (data: any) => void;
      onError?: (error: any) => void;
    },
  ) {
    return await RNFetchBlob.config({ timeout: this.config.timeout })
      .fetch("POST", route, props?.headers, props?.body)
      .uploadProgress({ interval: 1000 }, (written, total) => {
        props?.onLoading?.(written, total);
      })
      .then(res => {
        props?.onSuccess?.(res.data);
        return res.data;
      })
      .catch(error => {
        props?.onError?.(error);
        return error;
      });
  }
}
