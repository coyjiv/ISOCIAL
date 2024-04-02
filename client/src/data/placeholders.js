const DEFAULT_MALE_AVATAR = '/avatars/boy.png'
const DEFAULT_FEMALE_AVATAR = '/avatars/girl.png'
export const placeholderAvatar = (gender, firstName, lastName) =>
  gender === 'MALE'
    ? DEFAULT_MALE_AVATAR
    : gender === 'FEMALE'
    ? DEFAULT_FEMALE_AVATAR
    : `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`

export const userAvatar = (user, firstName, lastName) =>
  user?.avatarsUrl?.[0]?.length > 0
    ? user?.avatarsUrl?.[0]
    : placeholderAvatar(
        user?.gender,
        user?.firstName ?? firstName,
        user?.lastName ?? lastName
      )
