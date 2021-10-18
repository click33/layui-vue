import type { App, DefineComponent, Ref } from 'vue'
export type StringObject = Record<string, unknown>

export type UnknownObject = Record<string | number, unknown>

export type UnknownFunction = (...arg: unknown[]) => unknown

export type IDefineComponent<Props = UnknownObject> = DefineComponent<Props> & {
  install: (app: App, options?: InstallOptions) => void
}

export interface InstallOptions extends StringObject {
  pagination?: null
  menu?: null
}

export type Nullable<T> = T | null

export type MaybeRef<T> = Ref<T> | T

export type Recordable = Record<string, any>
