const DEFAULT_MALE_AVATAR = '/avatars/boy.png'
const DEFAULT_FEMALE_AVATAR = '/avatars/girl.png'
export const placeholderAvatar = (gender) =>
  gender === 'MALE' ? DEFAULT_MALE_AVATAR : DEFAULT_FEMALE_AVATAR
