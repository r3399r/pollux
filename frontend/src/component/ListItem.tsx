import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import style from './ListItem.module.scss';

type Props = HTMLAttributes<HTMLDivElement> & { focus?: boolean };

const ListItem = ({ children, focus, ...props }: Props) => (
  <div className={classNames(style.self, { [style.focus]: focus })} {...props}>
    {children}
  </div>
);

export default ListItem;
