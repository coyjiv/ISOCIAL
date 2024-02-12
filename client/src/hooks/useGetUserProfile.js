import { useEffect, useState } from 'react'
import { fetchUserProfile } from '../store/actions/profile.js'
import { useDispatch, useSelector } from 'react-redux'

const useGetUserProfile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    if (profile.firstName === '') {
      dispatch(fetchUserProfile())
    }

    if (profile.firstName) {
      setIsLoading(false)
    }
  }, [isLoading, profile, dispatch])

  return { profile, isLoading }
}

export default useGetUserProfile
