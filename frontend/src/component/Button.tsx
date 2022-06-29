import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import style from './Button.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'large' | 'medium' | 'small';
};

const Button = ({
  appearance = 'primary',
  size = 'medium',
  className,
  children,
  ...props
}: Props) => (
  <button className={classNames(style.self, style[size], style[appearance], className)} {...props}>
    {children}
  </button>
);

export default Button;
