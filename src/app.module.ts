import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtConstants } from "./app/core/constants/jwt_constants";
import AdministratorModule from "./app/modules/administrator/administrator.module";
import AuthModule from "./app/modules/auth/auth.module";
import ComplaintModule from "./app/modules/complaint/complaint.module";
import { ConfigurationModule } from "./app/modules/configuration/configuration.module";
import { ConfigurationService } from "./app/modules/configuration/configuration.service";
import { UploadModule } from "./app/modules/upload/upload.module";
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
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
    AuthModule,
    AdministratorModule,
    UserModule,
    ComplaintModule,
    UploadModule,
  ],
})
export class AppModule {}
