import { useCallback, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import signInSchema from '../../schema-validators/sign-in.ts';
import { useAuthStore } from '../../store/auth.ts';
import Button from '../../components/button';
import Input from '../../components/input';
import { routes } from '../../router';
import clsx from 'clsx';

export type Props = {
  email: string;
  password: string;
};

const SignIn: FC = () => {
  const { signIn, signedIn } = useAuthStore();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<Props>({
    mode: 'onChange',
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = useCallback(
    async (data: Props) => {
      await signIn(data.email, data.password);
    },
    [signIn],
  );

  if (signedIn.data) {
    console.log('User signed in:', signedIn.data);
    navigate(routes.home);
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-900 text-white">
      <div className="flex w-full max-w-lg flex-col items-center">
        <h1 className="mb-6 text-4xl font-semibold text-white">Welcome Back</h1>
        <p className="mb-4 text-gray-400">Log in to access your account</p>

        <form
          className="flex w-full flex-col gap-6 rounded-lg bg-gray-800 p-8 shadow-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            name="email"
            register={register}
            label="Email Address"
            placeholder="Enter your email"
            className="w-full"
            error={errors?.email?.message}
          />

          <Input
            name="password"
            register={register}
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="w-full"
            error={errors?.password?.message}
          />

          <Button
            type="submit"
            disabled={!isValid || !isDirty || signedIn.loading}
            className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-lg font-medium hover:bg-indigo-700"
          >
            {signedIn.loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <Link
          to={routes.signUp}
          className={clsx(
            'mt-6 w-full text-center text-sm font-medium text-indigo-400',
            'hover:underline',
          )}
        >
          Don’t have an account? Register here.
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
