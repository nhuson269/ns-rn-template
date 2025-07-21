import {ApiResponse} from 'apisauce';
import {translate} from 'languages';
import {getAuthTokenData} from 'models/AuthTokenModel';
import {getUserDemoData} from 'models/demo/UserDemoModel';
import {
  Client,
  GetDemoUserResult,
  getGeneralApiProblem,
  RegisterDemoResult,
  HEROKUAPP_CLIENT_CONFIG,
  LoginDemoResult,
  LogoutDemoResult,
  routes,
} from 'services/api';

class UserService {
  private client: Client;

  constructor() {
    this.client = new Client(HEROKUAPP_CLIENT_CONFIG);
  }

  async login(username: string, password: string): Promise<LoginDemoResult> {
    try {
      const response: ApiResponse<any> = await this.client.instance.post(
        routes.demo.herokuapp.user.login,
        {
          email: username,
          password: password,
        },
      );
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }
      const authToken = getAuthTokenData(response.data);
      return authToken
        ? {kind: 'ok', authToken: authToken}
        : {
            kind: 'unauthorized',
            message: translate('errors.unauthorizedError') || '',
          };
    } catch (error: any) {
      return {kind: 'bad-data', message: error};
    }
  }

  async register(
    fullname: string,
    email: string,
    password: string,
  ): Promise<RegisterDemoResult> {
    try {
      const response: ApiResponse<any> = await this.client.instance.post(
        routes.demo.herokuapp.user.register,
        {
          name: fullname,
          email: email,
          password: password,
          age: 18,
        },
      );
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }
      const authToken = getAuthTokenData(response.data);
      return authToken
        ? {kind: 'ok', authToken: authToken}
        : {
            kind: 'unauthorized',
            message: translate('errors.unauthorizedError') || '',
          };
    } catch (error: any) {
      return {kind: 'bad-data', message: error};
    }
  }

  async logout(): Promise<LogoutDemoResult> {
    try {
      const response: ApiResponse<any> = await this.client.instance.post(
        routes.demo.herokuapp.user.logout,
      );
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }
      return {kind: 'ok'};
    } catch (error: any) {
      return {kind: 'bad-data', message: error};
    }
  }

  async userMe(): Promise<GetDemoUserResult> {
    try {
      const response: ApiResponse<any> = await this.client.instance.get(
        routes.demo.herokuapp.user.me,
      );
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }
      const user = getUserDemoData(response.data);
      return user ? {kind: 'ok', data: user} : {kind: 'bad-data'};
    } catch (error: any) {
      return {kind: 'bad-data', message: error};
    }
  }
}

const userService = new UserService();

export default userService;
