import { Stack, FormControl, FormLabel, Container, Typography, Divider, Switch, FormControlLabel, TextField, RadioGroup, Radio, Button, Link } from '@mui/material';
import { withLayout } from "../../hooks/withLayout"
import styles from './settings.module.scss'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useGetProfileByIdQuery, useUpdateProfileMutation } from '../../store/services/profileService';
import { toast } from 'react-toastify';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../../store/services/settingsService';

const validationSchema = yup.object({
  firstName: yup.string('Enter your first name'),
  lastName: yup.string('Enter your last name'),
  city: yup.string('Enter your city'),
  bio: yup.string('Enter your bio'),
  gender: yup.string('Select your gender'),
  birthPlace: yup.string('Enter your birth place'),
  studyPlace: yup.string('Enter your study place'),
});

const SettingsPage = () => {
  const navigate = useNavigate();
  const [updateSettings] = useUpdateSettingsMutation()
  const [updateProfile] = useUpdateProfileMutation(localStorage.getItem('userId'));
  const { data: settings, isSuccess: isSettingsSuccess } = useGetSettingsQuery()
  const { data: profile, isSuccess: isProfileSuccess } = useGetProfileByIdQuery(localStorage.getItem('userId'))


  const initial = {
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    city: profile?.city,
    bio: profile?.bio,
    gender: profile?.gender,
    birthPlace: profile?.birthPlace,
    studyPlace: profile?.studyPlace,
  }

  const formik = useFormik({
    initialValues: initial,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateProfile({
        body: values, id: localStorage.getItem('userId')
      }).then(() => {
        toast.success('Profile updated successfully')
      }).catch(() => {
        toast.error('Error updating profile')
      })
    },
  });

  if (!isSettingsSuccess || !isProfileSuccess) {
    return null
  }
  const changeFriendsVisibility = () => {
    updateSettings({
      friendsListVisibility: settings?.friendsListVisibility === 'ALL' ? 'FRIENDS' : 'ALL'
    }).then(() => {
      toast.success('Settings updated successfully')
    }).catch(() => {
      toast.error('Error updating settings')
    })
  }

  const changeAgeVisibility = () => {
    updateSettings({
      ageVisibility: settings?.ageVisibility === 'ALL' ? 'FRIENDS' : 'ALL'
    }).then(() => {
      toast.success('Settings updated successfully')
    }).catch(() => {
      toast.error('Error updating settings')
    })
  }

  const changePostsVisibility = () => {
    updateSettings({
      postsVisibility: settings?.postsVisibility === 'ALL' ? 'FRIENDS' : 'ALL'
    }).then(() => {
      toast.success('Settings updated successfully')
    }).catch(() => {
      toast.error('Error updating settings')
    })
  }

  const changeReceiveNotifications = () => {
    updateSettings({
      receiveNotifications: !settings?.receiveNotifications
    }).then(() => {
      toast.success('Settings updated successfully')
    }).catch(() => {
      toast.error('Error updating settings')
    })
  }
  return (
    <Container className={styles.container} maxWidth='md'>
      <Stack spacing={4}>
        {/* Privacy Section */}
        <Typography className={styles.title} variant="h6" component="h2">Privacy settings</Typography>
        <Typography variant="p" sx={{ fontSize: '14px' }}>All/Friends</Typography>

        <FormControlLabel control={<Switch onChange={changeFriendsVisibility} checked={settings?.friendsListVisibility !== 'ALL'} />} sx={{ justifyContent: 'space-between' }} labelPlacement='start' label="Who can see my friends list" />

        <FormControlLabel control={<Switch onChange={changeAgeVisibility} checked={settings?.ageVisibility !== "ALL"} />} sx={{ justifyContent: 'space-between' }} labelPlacement='start' label="Who can see my age" />

        <FormControlLabel control={<Switch onChange={changePostsVisibility} checked={settings?.postsVisibility !== "ALL"} />} sx={{ justifyContent: 'space-between' }} labelPlacement='start' label="Who can see my posts" />
        <Divider />

        {/* Notifications Section */}
        <Typography className={styles.title} variant="h6" component="h2">Notifications settings</Typography>
        <FormControlLabel control={<Switch onChange={changeReceiveNotifications} checked={settings?.receiveNotifications} />} label="Receive notifications" />
        <Divider />

        {/* Profile Section */}
        <Typography className={styles.title} variant="h6" component="h2">Profile information</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            margin="normal"
          />
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            margin="normal"
          />
          <TextField
            fullWidth
            id="city"
            name="city"
            label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            margin="normal"
          />
          <TextField
            fullWidth
            id="bio"
            name="bio"
            label="Bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
            margin="normal"
          />

          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="MALE" control={<Radio />} label="Male" />
              <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            id="birthPlace"
            name="birthPlace"
            label="Birth Place"
            value={formik.values.birthPlace}
            onChange={formik.handleChange}
            error={formik.touched.birthPlace && Boolean(formik.errors.birthPlace)}
            helperText={formik.touched.birthPlace && formik.errors.birthPlace}
            margin="normal"
          />
          <TextField
            fullWidth
            id="studyPlace"
            name="studyPlace"
            label="Study Place"
            value={formik.values.studyPlace}
            onChange={formik.handleChange}
            error={formik.touched.studyPlace && Boolean(formik.errors.studyPlace)}
            helperText={formik.touched.studyPlace && formik.errors.studyPlace}
            margin="normal"
          />
          <Button disabled={Object.values(initial).every((val, i) => val === Object.values(formik.values)[i])} color="primary" sx={{ marginTop: '20px' }} variant="contained" type="submit">
            Update Profile
          </Button>
        </form>
        <Divider />

        {/* Reset Password Section */}
        <Typography className={styles.title} variant="h6" component="h2">Reset Password</Typography>
        <Link sx={{ fontSize: '16px', textAlign: 'left' }} component="button" variant="body1" onClick={() => navigate('/forgot-password')}>
          Reset your password
        </Link>
      </Stack>
    </Container>
  )
}

const Settings = withLayout(SettingsPage)

export default Settings