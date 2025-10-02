declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: "development" | "test" | "production";
    PORT?: string;
    TCP_PORT?: string;
    DB_FILE?: string;
  }
}
export {}
