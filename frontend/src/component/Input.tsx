import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes } from 'react';
import style from './Input.module.scss';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: boolean | string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, hint, error, className, disabled, autoComplete = 'off', ...props }, ref) => (
    <div>
      {label && (
        <div className={classNames(style.label, { [style.labelDisabled]: disabled })}>{label}</div>
      )}
      <input
        className={classNames(style.input, className, {
          [style.error]: error !== undefined && error !== false,
          [style.disabled]: disabled,
        })}
        disabled={disabled}
        autoComplete={autoComplete}
        ref={ref}
        {...props}
      />
      {typeof error === 'string' && <div className={style.errorMessage}>{error}</div>}
      {hint && <div className={style.hint}>{hint}</div>}
    </div>
  ),
);

Input.displayName = 'Input';

export default Input;
