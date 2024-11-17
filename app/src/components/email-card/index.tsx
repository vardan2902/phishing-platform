import { FC } from 'react';
import clsx from 'clsx';

interface Props {
  id: string;
  email: string;
  status: string;
  content: string;
}

const EmailCard: FC<Props> = ({ id, email, status, content }) => (
  <div
    className={clsx(
      'flex w-full flex-col rounded-lg border',
      'border-gray-200 bg-white p-6 shadow transition-shadow duration-300 hover:shadow-lg',
    )}
  >
    <div className="mb-4 flex items-center justify-between">
      <span className="text-xs font-medium text-gray-500">ID: {id}</span>

      <p
        className={clsx(
          'rounded-full px-3 py-1 text-xs font-semibold capitalize',
          status === 'active'
            ? 'bg-green-100 text-green-700'
            : 'bg-blue-100 text-blue-700',
        )}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </p>
    </div>

    <div className="mb-4">
      <p className="text-sm font-semibold text-gray-700">Email:</p>
      <p className="text-base font-medium text-gray-900">{email}</p>
    </div>

    <div
      className="text-sm leading-relaxed text-gray-600"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
);

export default EmailCard;
