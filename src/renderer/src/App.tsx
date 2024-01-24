import * as React from 'react'

import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'

// Others
import router from './routes'

const App: React.FC = () => {
  return (
    <ThemeProvider //
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
