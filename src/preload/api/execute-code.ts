import { ipcRenderer } from 'electron'

export type Options = {
  language: 'cpp' | 'java' | string
  code: string
  testcases: string[]
}

export async function execute(options: Partial<Options>): Promise<string[]> {
  return ipcRenderer //
    .invoke('execute-code', options)
}
