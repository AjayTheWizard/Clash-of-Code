import fs from 'fs'
import { exec } from 'child_process'
import { options as default_options } from '..'
import type { Options } from '../lang/cpp'
import { basename, dirname } from 'path'

export async function compile(code: string, options: Options): Promise<string[]> {
  const dir = `${default_options.outDir}/${options.fileName}`
  const path = `${dir}/Main.java`
  const out = `${dir}/Main.class`

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(path, code)

  if (default_options.stats) {
    console.log(`Code saved to ${path}`)
  }

  await compileJavaCode(path)

  if (default_options.stats) {
    console.log(`Code compiled successfully`)
  }

  // Map each testcase to a promise that resolves to the result of executing the code with that testcase
  const promises = options.testcases.map((testcase) => executeJavaCode(testcase, out))

  // Wait for all promises to resolve
  const results = await Promise.all(promises)

  if (default_options.stats) {
    console.log('Code executed successfully')
  }

  return results
}

function compileJavaCode(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`javac "${path}"`, (error, stdout, stderr) => {
      if (error) {
        reject(`Compilation error: ${error.message}\n${stderr}`)
      } else if (stderr) {
        reject(`Compilation error: ${stderr}`)
      } else {
        resolve(stdout)
      }
    })
  })
}

function executeJavaCode(input: string, path: string = 'code.class'): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = exec(
      `cd ${dirname(path)} & java "${basename(path).replace('.class', '')}"`,
      (error, stdout, stderr) => {
        if (
          (error && error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1) ||
          stderr
        ) {
          reject(new Error(`Execution error: ${error?.message}\n${stderr}`))
        } else {
          resolve(stdout)
        }
      }
    )

    // Set a timeout for the execution
    const timeout = setTimeout(() => {
      child.kill() // This will terminate the process
      killJavaCode()
      reject('Execution timed out')
    }, default_options.timeout)

    child.on('exit', () => {
      clearTimeout(timeout) // Clear the timeout if the process exits before the timeout
    })

    child.stdin?.write(input)
    child.stdin?.end()
  })
}

function killJavaCode(): void {
  const command = `taskkill /im java.exe /f > nul`

  console.log('EXEC:', command)

  exec(command, (error, _stdout, stderr) => {
    if (error || stderr) {
      console.error(`Error killing process: ${error || stderr}`)
    }
  })
}
