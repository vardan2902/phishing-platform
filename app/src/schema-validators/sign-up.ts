import { object, string } from 'yup';

const signUpScheme = object().shape({
  fullName: string()
    .required('Last name is required')
    .matches(/^[^\s]+$/, 'Last name without whitespace')
    .min(2, 'FullName min 2')
    .max(30, 'FullName max 30'),
  email: string()
    .required('Email is required')
    .email('Email validate')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Email without spaces',
    ),
  password: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character'),
});

export default signUpScheme;
