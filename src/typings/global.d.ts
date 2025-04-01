/// <reference types="vite/client" />

declare interface Window {
  // 扩展 Window 接口
  webkitDevicePixelRatio: number;
  mozDevicePixelRatio: number;
}

// 全局类型声明
declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type Recordable<T = any> = Record<string, T>;
declare interface ReadonlyRecordable<T = any> {
  readonly [key: string]: T;
}
declare interface Indexable<T = any> {
  [key: string]: T;
}
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type IntervalHandle = ReturnType<typeof setInterval>;

// 通用函数类型
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}
