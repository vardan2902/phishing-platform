import { useCallback, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import signUpScheme from '../../schema-validators/sign-up.ts';
import { routes } from '../../router';
import Input from '../../components/input';
import Button from '../../components/button';
import { useAuthStore } from '../../store/auth.ts';

export type TRegisterProps = {
  email: string;
  password: string;
  fullName: string;
};

const Register: FC = () => {
  const navigate = useNavigate();
  const { signUp, signedIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<TRegisterProps>({
    mode: 'onChange',
    resolver: yupResolver(signUpScheme),
  });

  const onSubmit = useCallback(
    async (data: TRegisterProps) => {
      await signUp(data.email, data.password, data.fullName);
      reset();
      navigate(routes.signIn); // Redirect to login after successful registration
    },
    [signUp, reset, navigate],
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-900 text-white">
      <div className="flex w-full max-w-lg flex-col items-center">
        <h1 className="mb-6 text-4xl font-semibold text-white">
          Create Account
        </h1>
        <p className="mb-4 text-gray-400">Sign up to get started!</p>

        <form
          className="flex w-full flex-col gap-6 rounded-lg bg-gray-800 p-8 shadow-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            name="fullName"
            label="Full Name"
            register={register}
            placeholder="Enter your full name"
            className="w-full"
            error={errors?.fullName?.message}
          />

          <Input
            name="email"
            label="Email Address"
            register={register}
            placeholder="Enter your email"
            className="w-full"
            error={errors?.email?.message}
          />

          <Input
            name="password"
            type="password"
            label="Password"
            register={register}
            className="w-full"
            placeholder="Enter your password"
            error={errors?.password?.message}
          />

          <Button
            type="submit"
            disabled={!isValid || !isDirty || signedIn.loading}
            className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-lg font-medium hover:bg-indigo-700"
          >
            {signedIn.loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>

        <Link
          to={routes.signIn}
          className={clsx(
            'mt-6 w-full text-center text-sm font-medium text-indigo-400',
            'hover:underline',
          )}
        >
          Already have an account? Log in.
        </Link>
      </div>
    </div>
  );
};

export default Register;
