import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & { focus?: boolean };

const ListItem = ({ children, focus, className, ...props }: Props) => (
  <div
    className={classNames(
      'cursor-pointer p-[10px] hover:text-olive-700',
      { 'text-olive-700': focus },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export default ListItem;
