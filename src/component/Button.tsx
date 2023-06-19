import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, ...props }: Props) => (
  <button
    className={classNames(
      'text-white rounded-[30px] px-[40px] py-3 outline-none bg-navy-500 hover:bg-navy-300 active:bg-navy-900 disabled:text-opacity-40',
      className,
    )}
    {...props}
  />
);

export default Button;
