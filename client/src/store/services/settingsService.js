import { postsApi } from './postService'

export const settingsApi = postsApi.injectEndpoints({
  reducerPath: 'settingsApi',
  tagTypes: ['Settings'],
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => `settings`,
      providesTags: ['Settings', 'Profile'],
    }),
    updateSettings: builder.mutation({
      query: (data) => {
        return {
          url: `settings/update`,
          method: 'PATCH',
          data,
        }
      },
      invalidatesTags: ['Settings', 'Profile'],
    }),
  }),
})

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi
