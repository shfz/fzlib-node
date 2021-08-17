import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import { ResultType } from "./log";

const querystring = require("querystring");

export class Http {
  private seed: number = 0;

  private response?: AxiosResponse;

  public client: AxiosInstance;

  constructor(seed: number, baseURL: string) {
    this.seed = seed;
    axiosCookieJarSupport(axios);
    this.client = axios.create({
      baseURL,
      jar: true,
      withCredentials: true,
      timeout: 2000
    });
  }

  private failureReport(error: any) {
    const log: ResultType = {
      code: 1,
      message: "Failed to request",
      seed: this.seed,
      http: {
        status: error.response.status,
        url: error.config.url,
        method: error.config.method,
        request: {
          headers: error.config.headers,
          data: error.config.data,
        },
        responce: {
          headers: error.response.headers,
          data: error.response.data,
        },
      },
    };
    console.log(JSON.stringify(log));
  }

  public done() {
    const log: ResultType = {
      code: 0,
      message: "No problem",
      seed: this.seed,
    };
    console.log(JSON.stringify(log));
    process.exit(0);
  }

  public error(message: string) {
    const log: ResultType = {
      code: 1,
      message,
      seed: this.seed,
      http: {
        status: this.response?.status,
        url: this.response?.config.url,
        method: this.response?.config.method,
        request: {
          headers: this.response?.config.headers,
          data: this.response?.config.data,
        },
        responce: {
          headers: this.response?.headers,
          data: this.response?.data,
        },
      },
    };
    console.log(JSON.stringify(log));
    process.exit(0);
  }

  public async get(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      const res = await this.client.get(url, config);
      this.response = res;
      return res;
    } catch (error) {
      this.failureReport(error);
    }
    process.exit(0);
  }

  public async delete(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      const res = await this.client.delete(url, config);
      this.response = res;
      return res;
    } catch (error) {
      this.failureReport(error);
    }
    process.exit(0);
  }

  public async head(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      const res = await this.client.head(url, config);
      this.response = res;
      return res;
    } catch (error) {
      this.failureReport(error);
    }
    process.exit(0);
  }

  public async options(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      const res = await this.client.options(url, config);
      this.response = res;
      return res;
    } catch (error) {
      this.failureReport(error);
    }
    process.exit(0);
  }

  public async post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      const res = await this.client.post(url, data, config);
      this.response = res;
      return res;
    } catch (error) {
      this.failureReport(error);
    }
    process.exit(0);
  }

  // h.postForm("/post", { username: "abc" });
  public async postForm(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      const res = await this.client.post(url, querystring.stringify(data), config);
      this.response = res;
      return res;
    } catch (error) {
      this.failureReport(error);
    }
    process.exit(0);
  }

  public async put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      const res = await this.client.put(url, data, config);
      this.response = res;
      return res;
    } catch (error) {
      this.failureReport(error);
    }
    process.exit(0);
  }

  public async patch(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    try {
      const res = await this.client.patch(url, data, config);
      this.response = res;
      return res;
    } catch (error) {
      this.failureReport(error);
    }
    process.exit(0);
  }
}
