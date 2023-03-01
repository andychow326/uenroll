export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ORIGIN: string;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      REDIS_PASS: string;
    }
  }
}
