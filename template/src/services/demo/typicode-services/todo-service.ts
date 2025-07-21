import {ApiResponse} from 'apisauce';
import {getArrTaskTypicodeData} from 'models/demo/TaskDemoModel';
import {
  Client,
  getGeneralApiProblem,
  GetTasksDemoResult,
  routes,
  TYPICODE_CLIENT_CONFIG,
} from 'services/api';

class TodoService {
  private client: Client;

  constructor() {
    this.client = new Client(TYPICODE_CLIENT_CONFIG);
  }

  async getList(offset: number = 0): Promise<GetTasksDemoResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.client.instance.get(
        routes.demo.typicode.todos,
        {
          limit: 15,
          offset: offset,
        },
      );

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }

      const items = getArrTaskTypicodeData(response.data);
      return {kind: 'ok', data: items};
    } catch (error: any) {
      return {kind: 'bad-data', message: error};
    }
  }
}

const todoService = new TodoService();

export default todoService;
