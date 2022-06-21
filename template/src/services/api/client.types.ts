import AuthTokenModel from "models/AuthTokenModel";
import DemoItemModel from "models/demo/ItemModel";
import DemoUserModel from "models/demo/UserModel";
import { GeneralApiProblem } from "./client.problem";

// START - DEMO
export type GetRegisterResult = { kind: "ok"; authToken: AuthTokenModel } | GeneralApiProblem;
export type GetDemoUserResult = { kind: "ok"; data: DemoUserModel } | GeneralApiProblem;
export type GetItemsResult = { kind: "ok"; data: DemoItemModel[] } | GeneralApiProblem;
export type GetItemResult = { kind: "ok"; data: DemoItemModel } | GeneralApiProblem;
// END - DEMO

export type LoginResult = { kind: "ok"; authToken: AuthTokenModel } | GeneralApiProblem;
export type LogoutResult = { kind: "ok" } | GeneralApiProblem;
