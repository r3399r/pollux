import ListItem from './ListItem';
import Popover from './Popover';

type Props = {
  open: boolean;
  onClose: () => void;
  anchorEl: Element | null;
  onClick: (stage: 'elementary' | 'junior-high' | 'senior-high') => void;
};

const StageMenu = ({ open, onClose, anchorEl, onClick }: Props) => {
  const stage = localStorage.getItem('stage') ?? 'elementary';

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <ListItem
        className="w-[80px] text-center"
        onClick={() => {
          onClick('elementary');
          onClose();
        }}
        focus={stage === 'elementary'}
      >
        國小
      </ListItem>
      <ListItem
        className="w-[80px] text-center"
        onClick={() => {
          onClick('junior-high');
          onClose();
        }}
        focus={stage === 'junior-high'}
      >
        國中
      </ListItem>
      <ListItem
        className="w-[80px] text-center"
        onClick={() => {
          onClick('senior-high');
          onClose();
        }}
        focus={stage === 'senior-high'}
      >
        高中
      </ListItem>
    </Popover>
  );
};

export default StageMenu;
