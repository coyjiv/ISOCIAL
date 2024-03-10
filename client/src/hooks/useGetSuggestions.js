import { useMemo } from 'react'

const useGetSuggestions = (userId, users, requests, friends) => {
  return useMemo(() => {
    if (users) {
      const usersWithoutMe = users?.filter((user) => user.id !== Number(userId))
      const usersWithoutRequests = usersWithoutMe.filter(
        (user) => !requests?.content.find((request) => request.id === user.id),
      )
      const usersWithoutFriends = usersWithoutRequests.filter(
        (user) => !friends?.find((friend) => friend.id === user.id),
      )

      return usersWithoutFriends
    }
  }, [userId, users, requests?.content, friends])
}

export default useGetSuggestions
