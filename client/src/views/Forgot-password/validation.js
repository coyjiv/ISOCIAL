import * as Yup from 'yup'

export const signupSchema = Yup.object().shape({
  email: Yup.string().required('Required field').email('Incorrect email'),
})
