export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export interface IRequestPayload {
  url: string;
  data?: any;
  method: string;
  headers?: any;
  params?: any;
  auth?: any;
}

export enum ENV {
  development = 'dev',
  production = 'prd',
  staging = 'stg',
  local = 'local',
  debug = 'debug'
}
