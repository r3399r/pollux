import { OptionUnstyled, OptionUnstyledProps } from '@mui/base';

const Option = (props: OptionUnstyledProps<string>) => (
  <OptionUnstyled
    {...props}
    slotProps={{
      root: { className: 'p-2 rounded-lg [&.Mui-selected]:bg-grey-500 hover:!bg-grey-300' },
    }}
  />
);

export default Option;
