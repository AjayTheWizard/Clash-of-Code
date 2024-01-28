import * as React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Textarea } from '../ui/textarea'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useAppDispatch } from '@/app/hooks'
import { setTestcases } from '@/features/editor/editorSlice'
import TestcaseOutput from './TestcaseOutput'

const testcases = [
  {
    input: '2\n1 2',
    output: '3'
  },
  {
    input: '2\n1 2',
    output: '3'
  }
]

const Testcase: React.FC = () => {
  const [testcase, setTestcase] = React.useState('')
  const [isChecked, setIsChecked] = React.useState<CheckedState>(false)
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
    <div className="p-2 pt-4 markdown-body overflow-y-auto h-full">
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
        <h4>Sample Testcases</h4>
        {testcases.map((testcase, i) => (
          <TestcaseOutput key={i} {...testcase} />
        ))}
      </div>
    </div>
  )
}

export default Testcase
