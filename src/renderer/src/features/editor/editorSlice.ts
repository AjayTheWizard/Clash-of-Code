import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface EditorState {
  question: string
  code: string
  testcases: Array<string>
}

// Define the initial state using that type
const initialState: EditorState = {
  question: '',
  code: '',
  testcases: []
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
    }
  }
})

export const { setCode, setTestcases } = editorSlice.actions

export default editorSlice.reducer
