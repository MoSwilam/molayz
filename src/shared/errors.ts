export class ErrorGenerator {
  static userFound(email: string) {
    return `user with email "${email}" exists!`;
  }

  static walletFound(address: string) {
    return `wallet "${address}" exists!`;
  }

  static telemetryFound(address: string) {
    return `telemetry "${address}" exists!`;
  }
}
