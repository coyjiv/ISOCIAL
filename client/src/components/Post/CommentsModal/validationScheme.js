import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
  text: Yup.string().required('Required').max(260, 'Maximum 260 characters'),
})
