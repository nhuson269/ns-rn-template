import AuthTokenModel from "models/AuthTokenModel";
import DemoTaskModel from "models/demo/TaskModel";
import DemoUserModel from "models/demo/UserModel";
import { GeneralApiProblem } from "./client.problem";

// START - DEMO
export type GetRegisterResult = { kind: "ok"; authToken: AuthTokenModel } | GeneralApiProblem;
export type GetDemoUserResult = { kind: "ok"; data: DemoUserModel } | GeneralApiProblem;
export type GetTasksResult = { kind: "ok"; data: DemoTaskModel[] } | GeneralApiProblem;
export type GetTaskResult = { kind: "ok"; data: DemoTaskModel } | GeneralApiProblem;
// END - DEMO

export type LoginResult = { kind: "ok"; authToken: AuthTokenModel } | GeneralApiProblem;
export type LogoutResult = { kind: "ok" } | GeneralApiProblem;
