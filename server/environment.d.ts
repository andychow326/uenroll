export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ORIGIN: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_URL: string;
      GMAIL_USER: string;
      GMAIL_CLIENT_ID: string;
      GMAIL_CLIENT_SECRET: string;
      GMAIL_REFRESH_TOKEN: string;

      IN_TEST: number;
    }
  }
}
