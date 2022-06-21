import { ApiResponse } from "apisauce";
import { translate } from "languages";
import { getAuthTokenData } from "models/AuthTokenModel";
import { getUserData } from "models/demo/UserModel";
import {
  Client,
  GetDemoUserResult,
  getGeneralApiProblem,
  GetRegisterResult,
  HEROKUAPP_CLIENT_CONFIG,
  LoginResult,
  LogoutResult,
  routes,
} from "services/api";

class UserService {
  private client: Client;

  constructor() {
    this.client = new Client(HEROKUAPP_CLIENT_CONFIG);
  }

  async login(username: string, password: string): Promise<LoginResult> {
    try {
      const response: ApiResponse<any> = await this.client.instance.post(routes.herokuapp.user.login, {
        email: username,
        password: password,
      });
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }
      const authToken = getAuthTokenData(response.data);
      return authToken
        ? { kind: "ok", authToken: authToken }
        : { kind: "unauthorized", message: translate("errors.unauthorizedError") || "" };
    } catch (error: any) {
      return { kind: "bad-data", message: error };
    }
  }

  async register(fullname: string, email: string, password: string): Promise<GetRegisterResult> {
    try {
      const response: ApiResponse<any> = await this.client.instance.post(routes.herokuapp.user.register, {
        name: fullname,
        email: email,
        password: password,
        age: 18,
      });
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }
      const authToken = getAuthTokenData(response.data);
      return authToken
        ? { kind: "ok", authToken: authToken }
        : { kind: "unauthorized", message: translate("errors.unauthorizedError") || "" };
    } catch (error: any) {
      return { kind: "bad-data", message: error };
    }
  }

  async logout(): Promise<LogoutResult> {
    try {
      const response: ApiResponse<any> = await this.client.instance.post(routes.herokuapp.user.logout);
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }
      return { kind: "ok" };
    } catch (error: any) {
      return { kind: "bad-data", message: error };
    }
  }

  async userMe(): Promise<GetDemoUserResult> {
    try {
      const response: ApiResponse<any> = await this.client.instance.get(routes.herokuapp.user.me);
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }
      const user = getUserData(response.data);
      return user ? { kind: "ok", data: user } : { kind: "bad-data" };
    } catch (error: any) {
      return { kind: "bad-data", message: error };
    }
  }
}

const userService = new UserService();

export default userService;
