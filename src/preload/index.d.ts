import { ElectronAPI } from '@electron-toolkit/preload'
import { execute } from './api/execute-code'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      execute: typeof execute
    }
  }
}
