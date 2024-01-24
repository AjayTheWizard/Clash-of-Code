import * as React from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'

// Pages
import Root from '@/pages/Root'
import Error from '@/pages/Errors/Error'
import { Suspense } from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/start',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: '/start',
        Component: React.lazy(() => import('@/pages/Coding'))
      }
    ]
  },
  {
    path: '*',
    element: <Error />
  }
])

export default router
