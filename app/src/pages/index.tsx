import { useCallback, useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { usePhishingStore } from '../store/phishing.ts';
import { useAuthStore } from '../store/auth.ts';
import EmailCard from '../components/email-card';
import Button from '../components/button';
import Input from '../components/input';
import { removeFromLocalStorage } from '../utils/ls-utils.ts';
import { phishingScheme } from '../schema-validators/phishing.ts';

export type PhishingProps = {
  email: string;
};

const Home: FC = () => {
  const { userProfile, fetchUserProfile, clearSignIn } = useAuthStore();
  const { phishingAttempts, fetchPhishingAttempts, postPhishing } =
    usePhishingStore();

  const logOutHandler = () => {
    removeFromLocalStorage('access_token');
    clearSignIn();
    window.location.reload();
  };

  const renderPhishingList = phishingAttempts.phishingList?.map((props) => (
    <EmailCard key={props.id} {...props} />
  ));

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PhishingProps>({
    mode: 'onChange',
    resolver: yupResolver(phishingScheme),
  });

  const onSubmit = useCallback(
    (data: PhishingProps) => {
      postPhishing(data.email);
      reset();
    },
    [postPhishing, reset],
  );

  useEffect(() => {
    fetchUserProfile();
    fetchPhishingAttempts();
  }, [fetchUserProfile, fetchPhishingAttempts]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-900 p-6 text-white">
      <div className="flex w-full max-w-lg flex-col gap-4">
        <header className="flex w-full items-center justify-between border-b border-gray-700 pb-4">
          <div>
            <p className="text-sm font-medium text-gray-400">
              Email: {userProfile.data?.email}
            </p>
            <p className="text-sm font-medium text-gray-400">
              Full Name: {userProfile.data?.fullName}
            </p>
          </div>
          <Button
            className="!w-fit rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
            onClick={logOutHandler}
          >
            Sign out
          </Button>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full items-center gap-4 rounded-lg bg-gray-800 p-4 shadow-md"
        >
          <Input
            name="email"
            register={register}
            placeholder="Enter phishing email"
            error={errors?.email?.message as string}
            className="flex-1 rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
          <Button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Submit
          </Button>
        </form>

        <section className="space-y-4">
          {renderPhishingList?.length ? (
            renderPhishingList
          ) : (
            <p className="text-center text-sm text-gray-500">
              No phishing attempts found.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
