import { useLocation, useSearchParams } from 'react-router-dom'

const useGetCurrentUserId = () => {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const pathSegments = pathname.split('/')
  const profileId = pathSegments[pathSegments.length - 1]
  const searchParamsId = searchParams.get('id')
  const isMyProfile = pathname === '/profile'

  return isMyProfile ? undefined : searchParamsId || profileId
}

export default useGetCurrentUserId
