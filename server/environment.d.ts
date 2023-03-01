export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ORIGIN: string;
    }
  }
}
