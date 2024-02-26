import { withLayout } from '../../hooks/withLayout'
import ProfileSkeleton from './skeletons/ProfileSkeleton'
import { useGetProfileByIdQuery } from '../../store/services/profileService'
import { useParams } from 'react-router-dom'

import { ProfileLayout } from './ProfileLayout'
import { useDocumentTitle } from 'usehooks-ts'

const ProfilePage = () => {
  const { id } = useParams();
  const { isLoading } = useGetProfileByIdQuery(id ?? localStorage.getItem('userId'));
  useDocumentTitle('Profile')
  return (
    <main>
      {isLoading ? <ProfileSkeleton /> : <ProfileLayout id={id} />}
    </main>
  )
}

const Profile = withLayout(ProfilePage)
export default Profile

