import { ApiResponse } from "apisauce";
import { Client, getGeneralApiProblem, GetItemsResult, routes, TYPICODE_CLIENT_CONFIG } from "services/api";

class TodoService {
  private client: Client;

  constructor() {
    this.client = new Client(TYPICODE_CLIENT_CONFIG);
  }

  async getItems(): Promise<GetItemsResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.client.instance.get(routes.typicode.todos);

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }

      const items = response.data.results;
      return { kind: "ok", data: items };
    } catch (error) {
      return { kind: "bad-data" };
    }
  }
}

const todoService = new TodoService();

export default todoService;
