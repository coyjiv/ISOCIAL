import { Avatar, Box, Button, Container, Divider, Grid, Input, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from '../profile.module.scss'

const Photos = () => {
  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.wash }}>
      <Container maxWidth={'lg'} sx={{ p: 2 }}>
        <Grid container spacing={4} >
          <Grid item xs={12} sm={6} md={5}>
            <div className={styles.card}>
              <Typography fontWeight={900} fontSize={20}>About me</Typography>
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
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box>
                <Stack>
                  <Stack direction={'row'}>
                    <Avatar sx={{ width: 40, height: 'auto' }} />
                    <Input sx={{ width: '100%', borderRadius: '50px' }} disableUnderline placeholder={'What\'s on your mind?'} />
                  </Stack>
                  <Divider />
                  <Button variant="text">Photo/Video</Button>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Photos