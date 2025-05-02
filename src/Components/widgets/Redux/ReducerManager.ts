import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Domain {
    id: string;
    domain: string;
    isActive: boolean;
    status: 'pending' | 'verified' | 'rejected';
    createdDate: number;
}

export const reducerManager = createApi({
    reducerPath: 'reducerManager',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/',
    }),
    tagTypes: ['Domain'],
    endpoints: (builder) => ({
        getDomains: builder.query<Domain[], void>({
            query: () => '/',
            providesTags: ['Domain'],
        }),
        getDomain: builder.query<Domain, string>({
            query: (id) => `/${id}`,
        }),
        addDomain: builder.mutation<void, Partial<Domain>>({
            query: (newDomain) => ({
                url: '/',
                method: 'POST',
                body: newDomain,
            }),
            invalidatesTags: ['Domain'],
        }),
        updateDomain: builder.mutation<void, { id: string; data: Partial<Domain> }>({
            query: ({ id, data }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Domain'],
        }),
        deleteDomain: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Domain'],
        }),
    }),
});

export const {
    useGetDomainsQuery,
    useGetDomainQuery,
    useAddDomainMutation,
    useUpdateDomainMutation,
    useDeleteDomainMutation,
} = reducerManager;
