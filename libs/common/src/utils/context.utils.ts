import { ExecutionContext } from '@nestjs/common';
import { constants } from 'http2';
import { jwtDecode } from 'jwt-decode';
import { JWT_PERMISSIONS_PROPERTY } from '../common.contants';

export class ContextUtils {

  static hasPermission(context: ExecutionContext, permission: string, header: string = constants.HTTP2_HEADER_AUTHORIZATION): boolean {
    return ContextUtils.getPermissions(context, header)?.includes(permission);
  }

  static getPermissions(context: ExecutionContext, header: string = constants.HTTP2_HEADER_AUTHORIZATION, property: string = JWT_PERMISSIONS_PROPERTY): string[] {
    return jwtDecode(ContextUtils.getToken(context, header))[property];
  }

  static getToken(context: ExecutionContext, header: string = constants.HTTP2_HEADER_AUTHORIZATION): string {
    return context.switchToHttp().getRequest().headers[header];
  }
}
