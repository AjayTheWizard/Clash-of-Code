import * as React from 'react'
import * as monaco from 'monaco-editor'

import Editor, { loader } from '@monaco-editor/react'
import { PlayIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'

import LanguageSelect from './LanguageSelect'

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import theme from 'monaco-themes/themes/Merbivore Soft.json'

self.MonacoEnvironment = {
  getWorker(_, label): Worker | Promise<Worker> {
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

loader.config({ monaco })
// @ts-ignore - Monaco doesn't have a type for this
monaco.editor.defineTheme('default', {
  ...theme,
  colors: { ...theme.colors, 'editor.background': '#0d1117' }
})
loader.init()

function CodeEditor(): JSX.Element {
  const [language, setLanguage] = React.useState('cpp')

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 flex">
        <LanguageSelect language={language} setLanguage={setLanguage} />
        <Button size="sm" className="ml-auto mr-2">
          <PlayIcon className="mr-2" />
          Run
        </Button>
      </div>
      <div className="m-2 h-full rounded overflow-hidden">
        <Editor
          height="100%"
          language={language}
          path={language}
          theme="default"
          options={{
            inlineSuggest: {
              enabled: true
            },
            fontSize: 16,
            formatOnType: true,
            minimap: {
              enabled: false
            }
          }}
        />
      </div>
    </div>
  )
}
export default CodeEditor
