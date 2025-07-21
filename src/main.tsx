import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'

import { routeTree } from './routeTree.gen'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { EmployeeProvider } from './context/EmployeeContext.tsx'
import { GradeLevelProvider } from './context/GradeLevelContext.tsx'

const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProvider.getContext(),
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <MantineProvider>
        <Notifications position={'top-right'} />
        <GradeLevelProvider>
          <EmployeeProvider>
            <TanStackQueryProvider.Provider>
              <RouterProvider router={router} />
            </TanStackQueryProvider.Provider>
          </EmployeeProvider>
        </GradeLevelProvider>
      </MantineProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
