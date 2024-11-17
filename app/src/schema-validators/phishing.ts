import { object, string } from 'yup';

export const phishingScheme = object().shape({
  email: string()
    .email('Email validate')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Email without spaces',
    )
    .required('Email is required'),
});
