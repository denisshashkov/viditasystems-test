import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDocument } from '../types/document'

export const documentsApi = createApi({
    reducerPath: 'documentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    endpoints: (builder) => ({
      getDocuments1: builder.query<IDocument, string>({
        query: () => 'documents1',
      }),
      getDocuments2: builder.query<IDocument, string>({
        query: () => 'documents2',
      }),
      cancel: builder.mutation({
        query: (body) => ({
          url: 'cancel',
          method:'POST',
          body
        })
      }),
    }),
  })
  
  
  export const { useGetDocuments1Query, useGetDocuments2Query, useCancelMutation } = documentsApi