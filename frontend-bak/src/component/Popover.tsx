import { Popover as MuiPopover } from '@mui/material';
import classNames from 'classnames';
import { CSSProperties, ReactNode } from 'react';
import style from './Popover.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
  anchorEl: Element | null;
  children: ReactNode;
  className?: string;
  cssProperties?: CSSProperties;
};

const Popover = ({ open, anchorEl, onClose, children, className, cssProperties }: Props) => (
  <MuiPopover
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    PaperProps={{ style: cssProperties, className: classNames(style.self, className) }}
  >
    {children}
  </MuiPopover>
);

export default Popover;
