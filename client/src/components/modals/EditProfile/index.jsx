import { useUpdateProfileMutation } from '../../../store/services/profileService';
import { Dialog, DialogContent, DialogTitle, Typography, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { Formik, Field, Form } from 'formik';
import { BlueRoundedButton } from '../../buttons';
import PropTypes from 'prop-types'
import styles from './editProfile.module.scss'
// import moment from 'moment';

const EditProfile = ({ onClose, open, profile }) => {

    const id = localStorage.getItem('userId');

    // const minDateOfBirth = moment().subtract(110, 'years').format('YYYY-MM-DD');

    // const maxDateOfBirth = moment().subtract(5, 'years').format('YYYY-MM-DD');

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
                        gender: profile?.gender,
                        // dateOfBirth: profile?.dateOfBirth,
                        birthPlace: profile?.birthPlace,
                        studyPlace: profile?.studyPlace,
                        // avatarsUrl: profile?.avatarsUrl[0],
                        // bannerUrl: profile.bannerUrl,
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values) => {
                        updateProfile({
                            body: {
                                ...values,
                                //  dateOfBirth: moment(values.dateOfBirth).format('YYYY-MM-DD')
                            }, id
                        });
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
                            <Field
                                as={TextField}
                                name="birthPlace"
                                label="Birth Place"
                                error={touched.birthPlace && Boolean(errors.birthPlace)}
                                helperText={touched.birthPlace && errors.birthPlace}
                                fullWidth
                            />
                            <Field
                                as={TextField}
                                name="studyPlace"
                                label="Study Place"
                                error={touched.studyPlace && Boolean(errors.studyPlace)}
                                helperText={touched.studyPlace && errors.studyPlace}
                                fullWidth
                            />

                            {/* <Field
                                as={TextField}
                                name="dateOfBirth"
                                label="Date of Birth"
                                type="date"
                                defaultValue="2017-05-24"
                                InputLabelProps={{
                                    shrink: true,
                                    min: minDateOfBirth,
                                    max: maxDateOfBirth,
                                }}
                                fullWidth
                            /> */}

                            {/* <Field name="dateOfBirth">
                                {({
                                    field, // { name, value, onChange, onBlur }
                                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                    meta,
                                }) => (
                                    <div>
                                        <label htmlFor="dateOfBirth">Date of Birth</label>
                                        <input
                                            type="date"
                                            {...field}
                                            id="dateOfBirth"
                                            min={minDateOfBirth}
                                            max={maxDateOfBirth}
                                            required
                                        />
                                        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
                                    </div>
                                )}
                            </Field> */}

                            <FormControl component="fieldset">
                                <FormLabel sx={{ textAlign: 'left' }} component="legend">Gender</FormLabel>
                                <Field name="gender" type="radio">
                                    {({ field }) => (
                                        <RadioGroup
                                            {...field}
                                            aria-label="gender"
                                            name="gender"
                                            style={{ display: 'flex', flexDirection: 'column' }}
                                        >
                                            <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                                            <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    )}
                                </Field>
                            </FormControl>

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
        gender: PropTypes.string,
        birthPlace: PropTypes.string,
        studyPlace: PropTypes.string,
    }).isRequired,
}


export { EditProfile }