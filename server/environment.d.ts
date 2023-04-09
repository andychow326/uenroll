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
      GMAIL_USER: string;
      GMAIL_CLIENT_ID: string;
      GMAIL_CLIENT_SECRET: string;
      GMAIL_REFRESH_TOKEN: string;
    }
  }
}
