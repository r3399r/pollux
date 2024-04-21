import { Popover as MuiPopover, PopoverProps } from '@mui/material';
import classNames from 'classnames';
import { CSSProperties, ReactNode } from 'react';

type Props = PopoverProps & {
  open: boolean;
  onClose: () => void;
  anchorEl: Element | null;
  children: ReactNode;
  className?: string;
  cssProperties?: CSSProperties;
};

const Popover = ({
  open,
  anchorEl,
  onClose,
  children,
  className,
  cssProperties,
  ...props
}: Props) => (
  <MuiPopover
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    slotProps={{
      paper: { style: cssProperties, className: classNames('!rounded-lg !bg-white', className) },
    }}
    {...props}
  >
    {children}
  </MuiPopover>
);

export default Popover;
