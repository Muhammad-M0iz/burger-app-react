import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './store/store.ts'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import {SignInPage,SignUpPage,CheckoutPage,OrdersPage,AuthPage} from './pages/index.ts'
import Layout from './Components/Layout.tsx'

import App from './App.tsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        index:true,
        element: <App />
      },
      {
    path: "/checkout",
    element: <AuthPage children={<CheckoutPage />} />
  },
  {
    path: "/orders",
    element: <AuthPage children={<OrdersPage />} />
  }
  ]
  },
  {
    path: "/signin",
    element: <SignInPage />
  },
  {
    path: "/signup",
    element: <SignUpPage />
  },
  
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
