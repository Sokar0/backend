declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'local' | 'dev' | 'prd';
      HTTP_PORT?: Number | 3123;
      HTTPS_PORT?: Number | 10555;
      ALLOWED_ORIGINS?: [];
    }
  }
}

export { }