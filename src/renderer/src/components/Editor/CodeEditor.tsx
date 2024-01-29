import * as React from 'react'
import * as monaco from 'monaco-editor'
import * as defaultCode from '@/constants/default-code'

import Editor, { loader } from '@monaco-editor/react'
import { PlayIcon, ReloadIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'

import LanguageSelect from './LanguageSelect'

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import theme from 'monaco-themes/themes/Merbivore Soft.json'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setOutput } from '@/features/editor/editorSlice'
import EditorSettings from './EditorSettings'

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

const default_options: monaco.editor.IStandaloneEditorConstructionOptions = {
  inlineSuggest: {
    enabled: false
  },
  fontSize: 16,
  formatOnType: true,
  minimap: {
    enabled: false
  },
  stickyScroll: {
    enabled: true
  }
}

type Editor = monaco.editor.IStandaloneCodeEditor

function CodeEditor(): JSX.Element {
  const [language, setLanguage] = React.useState(localStorage.language)
  const [isLoading, setIsLoading] = React.useState(false)

  const editorRef = React.useRef<Editor>(null)
  const testcases = useAppSelector((state) => state.editor.testcases)
  const settings = useAppSelector((state) => state.editor.settings)

  const [options, setOptions] =
    React.useState<monaco.editor.IStandaloneEditorConstructionOptions>(default_options)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      fontSize: settings.fontSize,
      tabSize: settings.tabSize,
      theme: settings.theme,
      minimap: {
        enabled: settings.minimap
      }
    }))
  }, [settings])

  function handleEditorDidMount(editor: Editor): void {
    // @ts-ignore - Can assign to 'current'
    editorRef.current = editor
  }

  async function runCode(): Promise<void> {
    const code = editorRef.current?.getValue()

    dispatch(setOutput([]))
    setIsLoading(true)

    window.api
      .execute({ code, testcases, language })
      .then((data) => dispatch(setOutput(data.map((item) => ({ result: item, sample: item })))))
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 p-2 flex items-center">
        <LanguageSelect language={language} setLanguage={setLanguage} />
        <Button size="sm" className="ml-auto mr-2" onClick={runCode} disabled={isLoading}>
          {isLoading ? <ReloadIcon className="animate-spin mr-2" /> : <PlayIcon className="mr-2" />}
          Run
        </Button>
        <EditorSettings />
      </div>
      <div className="my-2 h-full">
        <Editor
          height="100%"
          theme={options.theme}
          language={language}
          path={language}
          options={options}
          onMount={handleEditorDidMount}
          defaultValue={defaultCode[language]}
        />
      </div>
    </div>
  )
}
export default CodeEditor
