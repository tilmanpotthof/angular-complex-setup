declare class Angular {
  module(moduleName: string, dependencies?: Array<string>): AngularModule;
}

declare class AngularModule {
  directive(name: string, fn: Array<any>): AngularModule;
  directive(name: string, fn: Function): AngularModule;
  factory(name: string, fn: Array<any>): AngularModule;
  factory(name: string, fn: Function): AngularModule;
  directive(name: string, fn: Array<any>): AngularModule;
  directive(name: string, fn: Function): AngularModule;
}

declare var angular: Angular;
