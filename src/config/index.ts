import { AutoformatPlugin, PlatePlugin } from '@udecode/plate'
import { autoformatRules } from './autoformat/autoformatRules'

interface Config {
  autoformat: Partial<PlatePlugin<AutoformatPlugin>>
}

export const defaultContent = [
  {
    children: [
      {
        text: '',
      },
    ],
  },
]

export const CONFIG: Config = {
  autoformat: {
    options: {
      rules: autoformatRules,
    },
  },
}

export * from './UserPreferences'
