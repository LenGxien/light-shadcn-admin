import type { RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';

// 路由元数据类型
declare interface RouteMeta {
  title?: string;
  icon?: string;
  hideMenu?: boolean;
  hideBreadcrumb?: boolean;
  hideChildrenInMenu?: boolean;
  carryParam?: boolean;
  single?: boolean;
  roles?: string[];
  ignoreAuth?: boolean;
  order?: number;
}

// 扩展路由类型
declare type AppRouteRecordRaw = RouteRecordRaw & {
  name: string;
  meta?: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Record<string, any>;
  fullPath?: string;
};

// 组件类型
declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
