import { Box, Container, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from '../profile.module.scss'

const Friends = () => {
  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.wash }}>
      <Container maxWidth={'lg'} sx={{ p: 2 }}>
        <div className={styles.card}>
          <Typography fontWeight={900} fontSize={20}>Friends</Typography>
          <Typography marginY={2}>Bio</Typography>
          <Divider />
          <Typography marginTop={2}>City</Typography>
          <Typography marginTop={2}>Subscribers</Typography>
        </div>
        <div className={styles.card}>
          <div>
            <Typography fontWeight={900} fontSize={20}>Photos</Typography>
            <Link><Typography>View all</Typography></Link>
          </div>
          <div>


          </div>
        </div>
        <div className={styles.card}>
          <div>
            <Typography fontWeight={900} fontSize={20}>Friends</Typography>
            <Link><Typography>View all</Typography></Link>
          </div>

        </div>
      </Container>
    </Box>
  )
}

export default Friends