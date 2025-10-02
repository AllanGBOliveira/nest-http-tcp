import { Controller, Get, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("healthcheck")
  getHealthcheck() {
    return {
      status: "ok",
      message: "Service is healthy",
    };
  }
}
