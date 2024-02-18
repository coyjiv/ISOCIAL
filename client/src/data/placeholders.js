const DEFAULT_MALE_AVATAR = '/avatars/boy.png'
const DEFAULT_FEMALE_AVATAR = '/avatars/girl.png'
export const placeholderAvatar = (gender, { firstName, lastName }) =>
  gender === 'MALE'
    ? DEFAULT_MALE_AVATAR
    : gender === 'FEMALE'
    ? DEFAULT_FEMALE_AVATAR
    : `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`
