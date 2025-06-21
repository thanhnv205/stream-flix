export type BaseTheme = 'light' | 'dark'
export interface ITheme {
  theme: BaseTheme
}
export type Theme = BaseTheme | 'system'