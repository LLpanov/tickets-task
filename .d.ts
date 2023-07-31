declare namespace NodeJS {
  interface Process {
    on(event: 'unhandledRejection', listener: (reason: any, promise: Promise<any>) => void): this;
  }
}
