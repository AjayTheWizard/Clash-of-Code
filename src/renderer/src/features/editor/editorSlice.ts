import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type EditorSettingsType = {
  theme: string
  fontSize: number
  tabSize: number
  autoComplete: boolean
  minimap: boolean
}

// Define a type for the slice state
export interface EditorState {
  question: string
  code: string
  testcases: Array<string>
  settings: EditorSettingsType
  output: Array<{
    sample: string
    result: string
  }>
}

// Define the initial state using that type
export const initialState: EditorState = {
  question: '',
  code: '',
  testcases: [''],
  output: [],
  settings: {
    theme: 'default',
    fontSize: 16,
    tabSize: 4,
    autoComplete: true,
    minimap: false
  }
}

export const editorSlice = createSlice({
  name: 'editor',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload
    },
    setTestcases: (state, action: PayloadAction<Array<string>>) => {
      state.testcases = action.payload
    },
    setOutput: (state, action: PayloadAction<Array<{ sample: string; result: string }>>) => {
      state.output = action.payload
    },
    setEditorSettings: (state, action: PayloadAction<Partial<EditorSettingsType>>) => {
      state.settings = { ...state.settings, ...action.payload }
    }
  }
})

export const { setCode, setTestcases, setOutput, setEditorSettings } = editorSlice.actions

export default editorSlice.reducer
