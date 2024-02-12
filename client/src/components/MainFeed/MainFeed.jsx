import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'

import { PostCard } from '../../ui'
import s from './MainFeed.module.scss'
import { useSelector } from 'react-redux'

const MainFeed = () => {
  const { palette } = useTheme()
  const user = useSelector((state) => state.profile)

  return (
    <Box bgcolor={palette.background.secondary} className={s.container}>
      <PostCard
        avatar={user?.avatarUrl}
        author={`${user?.firstName} ${user?.lastName}`}
        description="Blah blah blah"
        timestamp="3d"
        image="https://source.unsplash.com/random"
      />
    </Box>
  )
}

MainFeed.displayName = 'MainFeed'

export default MainFeed
