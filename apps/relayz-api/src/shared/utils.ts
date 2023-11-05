import { NodeDataDto } from '../modules/node-management/nodes.types';
import { ENV } from './constants';
import * as fs from 'fs';
import { BadGatewayException } from '@nestjs/common';

export class Utils {
  static getEntriesFromObjByArrayOfKeys(arr: string[], obj: any) {
    return Object.fromEntries(
      arr
        .filter((key) => key in obj) // line can be removed to make it inclusive
        .map((key) => [key, obj[key]])
    ) as NodeDataDto;
  }

  IsDebug() {
    const { NODE_ENV: env } = process.env;
    return env === ENV.production ? false : true;
  }

  getEnv(): string {
    const env = this.IsDebug() ? '.env.local' : '.env';
    return env;
  }

  isFileExist(path: string) {
    if (fs.existsSync(path)) {
      return path;
    }
    throw new BadGatewayException(`Custom Error: File with ${path} Not found!`);
  }

  static getHttpOptions() {
    const keyPathOnServer = `${process.env.SERVER_CERT_PATH}/${process.env.SERVER_CERT_PRIVATE_KEY_FILE}`;
    const cerPathOnServer = `${process.env.SERVER_CERT_PATH}/${process.env.SERVER_CERT_CERTIFICATE_FILE}`;
    const { NODE_ENV: env } = process.env;

    console.log({ keyPathOnServer, cerPathOnServer });

    /** Key and Certificate on prod Server */
    const keyOnServer = fs.readFileSync(keyPathOnServer, 'utf8');
    const cerOnServer = fs.readFileSync(cerPathOnServer, 'utf8');

    const prodOptions = {
      key: keyOnServer,
      cert: cerOnServer
    };

    // if (ENV.production !== env) {
    //   console.log({ keyOnServer, cerOnServer });
    // }

    return prodOptions;
  }

  // static rLog(...params: any[]) {
  //   const stack = new Error().stack;

  //   // console.dir('stack');
  //   // console.dir(stack);

  //   const callerLine = stack.split('\n')[2]; // A segunda linha da pilha contém informações sobre a chamada da função
  //   const match = /\s\w+\.(.+)\s\(/.exec(callerLine); // Extrai o nome da classe e do método da linha da pilha

  //   const callerClassNameRegex = /at\s+(\w+)\.\w+\s+\(/;
  //   const callerClassNameMatch = callerClassNameRegex.exec(callerLine);
  //   const callerClassName = callerClassNameMatch ? callerClassNameMatch[1] : null;

  //   const methodNameRegex = /at\s+\w+\.(\w+)\s+\(/;
  //   const methodNameMatch = methodNameRegex.exec(callerLine);
  //   const methodNameInCaller = methodNameMatch ? methodNameMatch[1] : null;

  //   // const fileLocationRegex = /at\s+\w+\s+\(([^)]+)\)/;
  //   // const fileLocationMatch = fileLocationRegex.exec(callerLine);
  //   // const fileLocation = fileLocationMatch ? fileLocationMatch[1] : null;

  //   console.dir('==========================- Relayz Log -==========================');
  //   if (match) {
  //     // const [_, methodNameInFunction] = match;
  //     console.dir(`Class: ${callerClassName}`);
  //     console.dir(`Method: ${methodNameInCaller}`);
  //     // console.dir(`Location: ${fileLocation}`);
  //   }
  //   params.forEach((param, index) => {
  //     console.dir(`  Param ${index + 1}: ${JSON.stringify(param, null, 2)}`);
  //   });
  //   console.dir('==================================================================');
  // }
}
