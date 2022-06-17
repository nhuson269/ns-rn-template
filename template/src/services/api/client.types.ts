import ItemModel from "models/ItemModel";
import UserModel from "models/UserModel";
import { GeneralApiProblem } from "./client.problem";

export type GetUsersResult = { kind: "ok"; data: UserModel[] } | GeneralApiProblem;
export type GetUserResult = { kind: "ok"; data: UserModel } | GeneralApiProblem;

export type GetItemsResult = { kind: "ok"; data: ItemModel[] } | GeneralApiProblem;
export type GetItemResult = { kind: "ok"; data: ItemModel } | GeneralApiProblem;
