import AuthTokenModel from 'models/AuthTokenModel';
import TaskDemoModel from 'models/demo/TaskDemoModel';
import UserDemoModel from 'models/demo/UserDemoModel';
import {GeneralApiProblem} from './client.problem';

// START - DEMO
export type RegisterDemoResult =
  | {kind: 'ok'; authToken: AuthTokenModel}
  | GeneralApiProblem;
export type GetDemoUserResult =
  | {kind: 'ok'; data: UserDemoModel}
  | GeneralApiProblem;
export type GetTasksDemoResult =
  | {kind: 'ok'; data: TaskDemoModel[]}
  | GeneralApiProblem;
export type GetTaskDemoResult =
  | {kind: 'ok'; data: TaskDemoModel}
  | GeneralApiProblem;
export type LoginDemoResult =
  | {kind: 'ok'; authToken: AuthTokenModel}
  | GeneralApiProblem;
export type LogoutDemoResult = {kind: 'ok'} | GeneralApiProblem;
// END - DEMO
