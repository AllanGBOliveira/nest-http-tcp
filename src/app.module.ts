import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MathModule } from "./math/math.module";
import { BooksModule } from "./books/books.module";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      // O forRoot() carrega as variáveis de ambiente do arquivo .env
      // na raiz do projeto por padrão.
      isGlobal: true, // Torna o ConfigModule acessível em qualquer lugar
      // sem precisar importá-lo em outros módulos.
      // Você também pode usar 'envFilePath' para especificar um arquivo:
      // envFilePath: '.env.development',
    }),
    MathModule,
    BooksModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
