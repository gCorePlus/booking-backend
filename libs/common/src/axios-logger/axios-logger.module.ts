import * as AxiosLogger from '@gcoreplus/axios-logger';
import { ObjectLoggerBuilder } from '@gcoreplus/axios-logger';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Logger, Module, OnModuleInit } from '@nestjs/common';

@Module({
  imports: [HttpModule],
})
export class AxiosLoggerModule implements OnModuleInit {

  private readonly logger = new Logger(AxiosLoggerModule.name);

  constructor(
    private httpService: HttpService
  ) {}

  async onModuleInit(): Promise<void> {
    // Global settings
    this.httpService.axiosRef.defaults.timeout = 0;

    // AxiosLogger config
    AxiosLogger.setGlobalConfig({
      logger: (msg) => this.logger.debug(msg),
      createLoggerBuilder: config => new ObjectLoggerBuilder(config),

      headers: { apply: true }
    });

    // Request - Adding interceptors
    this.httpService.axiosRef.interceptors.request.use(
      (request) => AxiosLogger.requestLogger(request, {
        logger: (msg) => this.logger.debug(msg),
      }),
      (error) => AxiosLogger.errorLogger(error, {
        logger: (msg) => this.logger.error(msg),
      }),
    );

    // Response - Adding interceptors
    this.httpService.axiosRef.interceptors.response.use(
      (response) => AxiosLogger.responseLogger(response, {
        logger: (msg) => this.logger.debug(msg),
      }),
      (error) => AxiosLogger.errorLogger(error, {
        logger: (msg) => this.logger.error(msg),
      }),
    );
  }
}
