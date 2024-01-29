import React from 'react'

type Props = {
  sample: string
  result: string
}

const TestcaseOutput: React.FC<Props> = (props) => {
  return (
    <div className="flex justify-stretch gap-2">
      <div className="w-1/2 flex flex-col">
        <h5 style={{ marginTop: '0' }}>Sample Output</h5>
        <pre className="h-full">
          <code>{props.sample}</code>
        </pre>
      </div>
      <div className="w-1/2 flex flex-col">
        <h5 style={{ marginTop: '0' }}>Your Output</h5>
        <pre className="h-full">
          <code>{props.result}</code>
        </pre>
      </div>
    </div>
  )
}

export default TestcaseOutput
