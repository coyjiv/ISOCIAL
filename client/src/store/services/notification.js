//  notifications?receiverId=1&page=0&quantity=10

import {friendsApi} from "./friendService.js";

export const notificationApi = friendsApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: ({recieverId, page, quantity }) => `notifications?receiverId=${recieverId}&page=${page}&quantity=${quantity}`,
        }),
    }),
})

export const {
    useGetNotificationQuery
} = notificationApi