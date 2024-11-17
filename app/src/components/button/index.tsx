import clsx from 'clsx';

interface Props {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
}

const Button = ({
  children,
  type = 'button',
  onClick,
  className,
  disabled = false,
}: Props) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={clsx(
      'w-full rounded-lg bg-indigo-600 px-4 py-2 text-base font-medium text-white',
      'transition duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500',
      { 'opacity-50 cursor-not-allowed': disabled },
      className,
    )}
  >
    {children}
  </button>
);

export default Button;
