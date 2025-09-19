'use client'

import { Provider } from 'react-redux'
import { store } from '@/shared/stores/store'
import Products from './products/page'

export default function Home() {
  return (
    <Provider store={store}>
      <Products />
    </Provider>
  )
}
