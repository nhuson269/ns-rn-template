import { ApiResponse } from "apisauce";
import { translate } from "languages";

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "timeout"; temporary: true; message: string }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "cannot-connect"; temporary: true; message: string }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server"; message: string }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized"; message: string }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden"; message: string }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "not-found"; message: string }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected"; message: string }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true; message: string }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad-data"; message?: string };

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | null {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return {
        kind: "cannot-connect",
        temporary: true,
        message: translate("errors.connectionError", { status_code: response.status }) || "",
      };
    case "NETWORK_ERROR":
      return {
        kind: "cannot-connect",
        temporary: true,
        message: translate("errors.networkError", { status_code: response.status }) || "",
      };
    case "TIMEOUT_ERROR":
      return { kind: "timeout", temporary: true, message: translate("errors.timeoutError") || "" };
    case "SERVER_ERROR":
      return { kind: "server", message: translate("errors.serviceError", { status_code: response.status }) || "" };
    case "UNKNOWN_ERROR":
      return { kind: "unknown", temporary: true, message: translate("errors.unknownError") || "" };
    case "CLIENT_ERROR":
      switch (response.status) {
        case 401:
          return { kind: "unauthorized", message: translate("errors.unauthorizedError") || "" };
        case 403:
          return { kind: "forbidden", message: translate("errors.forbiddenError") || "" };
        case 404:
          return { kind: "not-found", message: translate("errors.notFoundError") || "" };
        default:
          return { kind: "rejected", message: translate("errors.rejectedError") || "" };
      }
    case "CANCEL_ERROR":
      return null;
  }
  return null;
}
