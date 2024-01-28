import { ipcMain as ipc } from 'electron'
import { init, cpp, java, python, javascript, typescript } from '../compiler'

init({ stats: true })

type SupportedLanguages = 'cpp' | 'java' | 'python' | 'javascript' | 'typescript'

interface ExecuteCodeEvent {
  language: SupportedLanguages
  code: string
  testcases: string[]
}

async function executeCode(
  code: string,
  testcase: string[],
  language: SupportedLanguages
): Promise<string[]> {
  if (language === 'cpp') {
    return cpp.compile(code, {
      fileName: 'cppmain',
      testcases: testcase
    })
  }

  if (language === 'java') {
    return java.compile(code, {
      fileName: 'Main',
      testcases: testcase
    })
  }

  if (language === 'python') {
    return python.compile(code, {
      fileName: 'main',
      testcases: testcase
    })
  }

  if (language === 'javascript') {
    return javascript.compile(code, {
      fileName: 'main',
      testcases: testcase
    })
  }

  if (language === 'typescript') {
    return typescript.compile(code, {
      fileName: 'main',
      testcases: testcase
    })
  }

  return [language]
}

ipc.handle('execute-code', async (_event, args: ExecuteCodeEvent) => {
  const result = await executeCode(args.code, args.testcases, args.language)
  return result
})
