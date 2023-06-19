import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLHeadingElement>;

const H3 = ({ className, ...props }: Props) => (
  <h3 className={classNames('font-bold text-[24px] leading-[32px] m-0', className)} {...props} />
);

export default H3;
