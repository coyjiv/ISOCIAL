import { useUpdateProfileMutation } from '../../../store/services/profileService';
import { Dialog, DialogContent, DialogTitle, Typography, TextField } from '@mui/material'
import { Formik, Field, Form } from 'formik';
import { BlueRoundedButton } from '../../buttons';
import PropTypes from 'prop-types'
import styles from './editProfile.module.scss'

const EditProfile = ({ onClose, open, profile }) => {

    const id = localStorage.getItem('userId');

    const handleClose = () => {
        onClose();
    };

    const [updateProfile] = useUpdateProfileMutation(id);
    return (
        id &&
        <Dialog scroll="paper" sx={{
            '& .MuiDialog-paper': {
                width: '500px',
                textAlign: 'center',
                padding: '20px',
            }
        }} onClose={handleClose} open={open}>
            <DialogTitle fontSize={20} fontWeight={900} >Edit profile</DialogTitle>
            <DialogContent>
                <Typography textAlign={'left'}>Profile details :</Typography>
                <Formik
                    initialValues={{
                        firstName: profile?.firstName,
                        lastName: profile?.lastName,
                        bio: profile?.bio,
                        city: profile?.city,
                        // avatarsUrl: profile?.avatarsUrl[0],
                        // bannerUrl: profile.bannerUrl,
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values) => {
                        updateProfile({ body: values, id });
                        onClose();
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={styles.form}>
                            <Field
                                as={TextField}
                                name="firstName"
                                label="First Name"
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                fullWidth
                            />
                            <Field
                                as={TextField}
                                name="lastName"
                                label="Last Name"
                                error={touched.lastName && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                fullWidth
                            />
                            <Field
                                as={TextField}
                                name="bio"
                                label="Bio"
                                error={touched.bio && Boolean(errors.bio)}
                                helperText={touched.bio && errors.bio}
                                fullWidth
                            />
                            <Field
                                as={TextField}
                                name="city"
                                label="City"
                                error={touched.city && Boolean(errors.city)}
                                helperText={touched.city && errors.city}
                                fullWidth
                            />
                            <BlueRoundedButton type='submit'>Submit</BlueRoundedButton>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
            {/* <BlueRoundedButton disabled={true}>Create a post</BlueRoundedButton> */}
        </Dialog>
    )
}

EditProfile.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    profileId: PropTypes.string,
    profile: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        bio: PropTypes.string,
        city: PropTypes.string,
        avatarsUrl: PropTypes.arrayOf(PropTypes.string),
        bannerUrl: PropTypes.string,
        dateOfBirth: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
}


export { EditProfile }