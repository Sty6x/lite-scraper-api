class FileFormat {
  strategy: any;
  constructor(strategy: any, data: { [key: string]: any }) {
    this.strategy = strategy;
  }
  async format() {}
}
