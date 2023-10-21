import { PerfilType } from "src/app/core/utils/perfil.type";

export default class LoginDto {
  email: string;
  password: string;
  perfilType: PerfilType;
}
