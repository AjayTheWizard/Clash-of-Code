import fs from 'fs'
import { exec } from 'child_process'
import { options as default_options } from '..'
import { basename } from 'path'

export type Options = {
  fileName: string
  testcases: string[]
}

export async function compile(code: string, options: Options): Promise<string[]> {
  const filename = options.fileName

  const path = `${default_options.outDir}/${filename}.cpp`
  const out = `${default_options.outDir}/${filename}.exe`

  fs.writeFileSync(path, code)

  if (default_options.stats) {
    console.log(`Code saved to ${path}`)
  }

  await compileCppCode(path, out)

  if (default_options.stats) {
    console.log(`Code compiled successfully`)
  }

  // Map each testcase to a promise that resolves to the result of executing the code with that testcase
  const promises = options.testcases.map((testcase) => executeCppCode(testcase, out))

  // Wait for all promises to resolve
  const results = await Promise.all(promises)

  if (default_options.stats) {
    console.log('Code executed successfully')
  }

  return results
}

function compileCppCode(path: string, out: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`g++ "${path}" -o ${out}`, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Compilation error: ${error.message}\n${stderr}`))
      } else if (stderr) {
        reject(new Error(`Compilation error: ${stderr}`))
      } else {
        resolve(stdout)
      }
    })
  })
}

function executeCppCode(input: string, path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = exec(`"${path}"`, (error, stdout, stderr) => {
      if (
        (error && error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1) ||
        stdout.length > 1_00_000
      ) {
        killCppCode(basename(path))
        return reject(
          'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.'
        )
      }

      if (stderr) {
        return reject(stderr)
      }

      resolve(stdout)
    })

    // Set a timeout for the execution
    const timeout = setTimeout(() => {
      child.kill() // This will terminate the process
      killCppCode(basename(path))
      reject('Execution timed out')
    }, default_options.timeout)

    child.on('exit', () => {
      clearTimeout(timeout) // Clear the timeout if the process exits before the timeout
    })

    child.stdin?.write(input)
    child.stdin?.end()
  })
}

function killCppCode(path: string): void {
  const command =
    process.platform === 'win32' ? `taskkill /im ${path} /f > nul` : `pkill -f ${path}`

  console.log('EXEC:', command)

  exec(command, (error, _stdout, stderr) => {
    if (error || stderr) {
      console.error(`Error killing process: ${error || stderr}`)
    }
  })
}
