import { configureStore } from '@reduxjs/toolkit'
import { documentsApi } from './documentsApi'

export const store = configureStore({
  reducer: {
    [documentsApi.reducerPath]: documentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(documentsApi.middleware),
})


