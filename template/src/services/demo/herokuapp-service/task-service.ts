import { ApiResponse } from "apisauce";
import { getArrTaskHerokuappData } from "models/demo/TaskDemoModel";
import { Client, getGeneralApiProblem, GetTasksDemoResult, HEROKUAPP_CLIENT_CONFIG, routes } from "services/api";

class TaskService {
  private client: Client;

  constructor() {
    this.client = new Client(HEROKUAPP_CLIENT_CONFIG);
  }

  async getTasks(offset: number, limit: number = 15): Promise<GetTasksDemoResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.client.instance.get(routes.demo.herokuapp.task.url, {
        limit: limit,
        skip: offset,
      });

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }

      const items = getArrTaskHerokuappData(response.data.data);
      return { kind: "ok", data: items };
    } catch (error: any) {
      return { kind: "bad-data", message: error };
    }
  }
}

const taskService = new TaskService();

export default taskService;
