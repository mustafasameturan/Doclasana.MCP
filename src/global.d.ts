declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOCLASANA_API_KEY?: string;
    }
    interface Process {
      env: ProcessEnv;
      exit(code?: number): never;
    }
  }
  
  const process: NodeJS.Process;
}

declare module "@modelcontextprotocol/sdk/server/index.js" {
  export class Server {
    constructor(serverInfo: any, capabilities: any);
    setRequestHandler(schema: any, handler: any): void;
    connect(transport: any): Promise<void>;
  }
}

declare module "@modelcontextprotocol/sdk/server/stdio.js" {
  export class StdioServerTransport {
    constructor();
  }
}

declare module "@modelcontextprotocol/sdk/types.js" {
  export const CallToolRequestSchema: any;
  export const ListToolsRequestSchema: any;
  export enum ErrorCode {
    InvalidRequest = "InvalidRequest",
    MethodNotFound = "MethodNotFound", 
    InternalError = "InternalError"
  }
  export class McpError extends Error {
    constructor(code: ErrorCode, message: string);
  }
}

declare module "axios" {
  export interface AxiosError {
    response?: {
      status: number;
      data?: any;
    };
    request?: any;
    message: string;
  }
  export default function axios(config: any): Promise<any>;
  namespace axios {
    function get(url: string, config?: any): Promise<any>;
    function post(url: string, data?: any, config?: any): Promise<any>;
    function put(url: string, data?: any, config?: any): Promise<any>;
  }
}

declare module "zod" {
  export interface ZodError {
    errors: Array<{
      path: (string | number)[];
      message: string;
    }>;
  }
  export const z: {
    object(shape: any): any;
    string(): any;
    number(): any;
  };
}

export {}; 