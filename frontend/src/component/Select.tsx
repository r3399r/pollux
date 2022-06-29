import classNames from 'classnames';
import { isValidElement, ReactNode, useEffect, useRef, useState } from 'react';
import SelectContext from 'src/context/SelectContext';
import Popover from './Popover';
import style from './Select.module.scss';

/**
 * usage example:
 *
 * <Select>
 *   <SelectOption value="aa">a</SelectOption>
 *   <SelectOption value="bb">b</SelectOption>
 *   <SelectOption value="cc">c</SelectOption>
 * </Select>
 */

export type Props = {
  children: ReactNode[];
  className?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
};

const Select = ({ children, className, defaultValue, onChange }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<{ value: string; children: ReactNode }[]>([]);
  const [selected, setSelected] = useState<string>(defaultValue ?? '');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOptions(
      children.map((child) => {
        if (!isValidElement(child)) return null;

        return child.props;
      }),
    );
  }, []);

  const handleChange = (v: string) => {
    setOpen(false);
    setSelected(v);
    onChange && onChange(v);
  };

  return (
    <SelectContext.Provider value={{ handleChange }}>
      <div className={classNames(style.select, className)} onClick={() => setOpen(!open)} ref={ref}>
        {options.find((v) => v.value === selected)?.children}
      </div>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={ref.current}
        cssProperties={{ width: ref.current?.offsetWidth }}
      >
        {children}
      </Popover>
    </SelectContext.Provider>
  );
};

export default Select;
