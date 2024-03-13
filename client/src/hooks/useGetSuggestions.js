import { useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { LS_KEYS } from '../utils/constants/index.js';

const useGetSuggestions = (userId, users, requests, friends) => {
  const [hiddenUsersId] = useLocalStorage(LS_KEYS.HIDDEN_USERS, []);

  return useMemo(() => {
    if (users) {
      const usersWithoutMe = users?.filter(user => user.id !== Number(userId));
      const usersWithoutRequests = usersWithoutMe.filter(
        (user) => !requests?.content.find((request) => request.id === user.id),
      )
      const usersWithoutFriends = usersWithoutRequests.filter(
        (user) => !friends?.find((friend) => friend.id === user.id),
      )

      return usersWithoutFriends.filter(
        (user) => !hiddenUsersId.includes(user.id),
      )
    }
  }, [userId, users, requests?.content, friends, hiddenUsersId]);
};

export default useGetSuggestions;
