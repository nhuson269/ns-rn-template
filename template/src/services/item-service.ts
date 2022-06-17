import { ApiResponse } from "apisauce";
import { Client, getGeneralApiProblem, GetItemsResult, routes } from "./api";

class ItemService {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  async getItems(): Promise<GetItemsResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.client.instance.get(routes.tracking.list);

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

const itemService = new ItemService();

export default itemService;
