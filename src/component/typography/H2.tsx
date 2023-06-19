import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLHeadingElement>;

const H2 = ({ className, ...props }: Props) => (
  <h2 className={classNames('font-bold text-[28px] leading-[34px] m-0', className)} {...props} />
);

export default H2;
