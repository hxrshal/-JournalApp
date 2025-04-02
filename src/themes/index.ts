import { lightTheme } from './lightTheme'
import { darkTheme } from './darkTheme'
import { forestTheme } from './forestTheme'
import { cappuccinoTheme } from './cappuccinoTheme'
import { baseTheme } from 'config'

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `.${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text

type LightThemeItemKey = RecursiveKeyOf<typeof lightTheme>
type BaseThemeItemKey = RecursiveKeyOf<typeof baseTheme>

const theme = (itemKey: LightThemeItemKey | BaseThemeItemKey, alpha = 1) => {
  const cssVar = itemKey.split('.').reduce((acc, key) => acc + '-' + key, '-')
  if (itemKey.split('.')[0] == 'color') {
    return `rgba(var(${cssVar}), ${alpha})`
  }
  return `var(${cssVar})`
}

const getCSSVar = (itemKey: LightThemeItemKey | BaseThemeItemKey) => {
  return itemKey.split('.').reduce((acc, key) => acc + '-' + key, '-')
}

export {
  theme,
  getCSSVar,
  lightTheme,
  darkTheme,
  baseTheme,
  forestTheme,
  cappuccinoTheme,
  LightThemeItemKey,
  BaseThemeItemKey,
}
