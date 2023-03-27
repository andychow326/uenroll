export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ORIGIN: string;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASS: string;
    }
  }
}
