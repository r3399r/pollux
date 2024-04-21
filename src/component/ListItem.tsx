import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & { focus?: boolean };

const ListItem = ({ children, focus, className, ...props }: Props) => {
  const stage = localStorage.getItem('stage') ?? 'elementary';

  return (
    <div
      className={classNames(
        'cursor-pointer p-[10px]',
        {
          'hover:text-orange-700': stage === 'elementary',
          'hover:text-olive-700': stage === 'junior-high',
          'hover:text-haze-700': stage === 'senior-high',
          'text-orange-700': focus && stage === 'elementary',
          'text-olive-700': focus && stage === 'junior-high',
          'text-haze-700': focus && stage === 'senior-high',
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ListItem;
