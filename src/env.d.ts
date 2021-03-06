declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "test" | "production" | "staging";
    PORT: string;
    API_NAME: string;
    API_TOKEN: string;
    API_IMAGE: string;
    API_URL: string;
    HEADLESS: "0" | "1";
  }
}
