import * as React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Textarea } from '../ui/textarea'
import { CheckedState } from '@radix-ui/react-checkbox'

const Testcase: React.FC = () => {
  const [isChecked, setIsChecked] = React.useState<CheckedState>(true)

  const handleCheckboxChange = (event: CheckedState): void => {
    setIsChecked(event)
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
          className="mt-3 font-mono"
          placeholder="Enter your custom testcase here"
        ></Textarea>
      )}

      <div>
        <h4>Sample Testcases</h4>
        <div className="flex gap-2">
          <div className="w-1/2">
            <h5 style={{ marginTop: '0' }}>Input</h5>
            <pre>
              <code>
                3 2 4{'\n'}
                16
              </code>
            </pre>
          </div>
          <div className="w-1/2">
            <h5 style={{ marginTop: '0' }}>Output</h5>
            <pre>
              <code>1 2{'\n'} </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testcase
