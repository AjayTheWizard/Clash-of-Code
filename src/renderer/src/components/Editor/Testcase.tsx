import * as React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Textarea } from '../ui/textarea'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setTestcases } from '@/features/editor/editorSlice'
import TestcaseOutput from './TestcaseOutput'

const Testcase: React.FC = () => {
  const [testcase, setTestcase] = React.useState('')
  const [isChecked, setIsChecked] = React.useState<CheckedState>(false)
  const output = useAppSelector((state) => state.editor.output)
  const dispatch = useAppDispatch()

  const handleCheckboxChange = (event: CheckedState): void => {
    setIsChecked(event)
    if (event) {
      dispatch(setTestcases([testcase]))
    } else {
      dispatch(setTestcases(['3 2', '16 3', '167 82', '331 444']))
    }
  }

  return (
    <div className="p-4 pt-6 markdown-body overflow-y-auto h-full">
      <div className="flex items-center space-x-2">
        <Checkbox id="custom-testcase" onCheckedChange={handleCheckboxChange} />
        <label
          htmlFor="custom-testcase"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Custom Testcase
        </label>
      </div>

      {isChecked && (
        <Textarea
          value={testcase}
          onChange={(e) => setTestcase(e.target.value)}
          onBlur={() => dispatch(setTestcases([testcase]))}
          className="mt-3 font-mono"
          placeholder="Enter your custom testcase here"
        ></Textarea>
      )}

      <div>
        <h4>Compiler Message</h4>
        <pre>
          <code>Compiling...</code>
        </pre>
      </div>

      {output.length > 0 && (
        <div>
          <h4>Sample Testcases</h4>
          {output.map((testcase, i) => (
            <TestcaseOutput key={i} {...testcase} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Testcase
