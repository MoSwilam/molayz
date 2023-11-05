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

export enum ContracttIdEnv {
  development = 'dev-relayz-node.testnet',
  production = 'relayz-node.testnet',
  staging = 'stage-relayz-node.testnet'
}

export enum ClientLibCredsFilePath {
  development = 'dev-relayz-api-secret.json',
  production = 'relayz-api-secret.json',
  staging = 'stage-relayz-api-secret.json'
}
