import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigurationModule } from "./app/modules/configuration/configuration.module";
import { ConfigurationService } from "./app/modules/configuration/configuration.service";
import UserModule from "./app/modules/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],

      useFactory: (configService: ConfigurationService) => ({
        type: "postgres",
        host: configService.getDbHost(),
        port: configService.getDbPort(),
        username: configService.getDbUsername(),
        password: configService.getDbPassword(),
        database: configService.getDbDatabase(),
        entities: [__dirname + "/**/**/*.model{.js,.ts}"],
        synchronize: true,
      }),
    }),
    UserModule,
  ],
})
export class AppModule {}
