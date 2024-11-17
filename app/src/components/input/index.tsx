import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  Icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  error?: string;
  label?: string;
  register?: UseFormRegister<T>;
  containerClass?: string;
}

const Input = <T extends Record<string, unknown>>({
  name,
  Icon,
  error,
  label,
  register,
  containerClass = '',
  className = '',
  type = 'text',
  ...rest
}: Props<T>) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const isPassword = type === 'password';

  const inputClassName = clsx(
    'h-10 w-full rounded-lg border bg-gray-800 px-4 text-sm text-gray-200',
    'focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500',
    {
      'border-gray-700': !error,
      'border-red-500': error,
      'pl-10': Icon,
    },
    className,
  );

  return (
    <div className={clsx('relative w-full', containerClass)}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-400">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
        )}

        <input
          type={isVisible ? 'text' : type}
          className={inputClassName}
          {...(register ? register(name) : {})}
          {...rest}
          name={name}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 focus:outline-none"
          >
            {isVisible ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeSlashIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
