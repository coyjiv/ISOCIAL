import { useLocation } from 'react-router-dom'

const useGetPathSegment = () => {
  const { pathname } = useLocation()

  const pathSegments = pathname.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1]
  const firstSegment = pathSegments[0]

  return { lastSegment, firstSegment }
}

export default useGetPathSegment
