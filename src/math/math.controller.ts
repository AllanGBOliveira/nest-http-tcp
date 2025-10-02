import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ClientProxy, MessagePattern } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { MATH_SERVICE } from "./math.constants";

@Controller("math")
export class MathController {
  constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  execute(): Observable<number> {
    const pattern = { cmd: "sum" };
    const data = [1, 2, 3, 4, 5];
    return this.client.send<number>(pattern, data);
  }

  @Get(":x")
  executeByParam(@Param("x") x: number): Observable<number> {
    const pattern = { cmd: "sum" };
    const data = [];

    for (let index = 0; index < Number(x); index++) {
      data.push(Number(index) + 1);
    }

    return this.client.send<number>(pattern, data);
  }

  @MessagePattern({ cmd: "sum" })
  sum(data: number[]): number {
    console.log('aqui')
    return (data || []).reduce((a, b) => a + b);
  }
}
