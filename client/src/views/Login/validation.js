import * as Yup from "yup";

export const validationSchema = Yup.object({
    username: Yup.string()
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, 'Invalid email address format')
        .required('Username is required'),

    password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    /*.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'Password must contain at least one lowercase letter, one uppercase letter, and one digit'
    )*/,
  
})

