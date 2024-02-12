import { Box, Typography, useTheme } from '@mui/material'

import s from './GroupConversations.module.scss'

const GroupConversations = () => {
  const { palette } = useTheme()

  return (
    <Box bgcolor={palette.background.secondary} className={s.wrapper}>
      <Typography fontSize="17px" fontWeight="600" color={palette.text.grey}>
        Group Conversations
      </Typography>
    </Box>
  )
}

GroupConversations.displayName = 'GroupConversations'

export default GroupConversations
