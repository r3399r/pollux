import { useDispatch } from 'react-redux';
import ModalVanilla from 'src/component/celestial-ui/ModalVanilla';
import { openSnackbar } from 'src/redux/uiSlice';
import { deleteTag } from 'src/service/tagService';

type Props = {
  open: boolean;
  handleClose: () => void;
  tagId?: string;
};

const ModalDelete = ({ open, handleClose, tagId }: Props) => {
  const dispatch = useDispatch();

  const onConfirm = () => {
    if (tagId === undefined) return;
    deleteTag(tagId)
      .then(handleClose)
      .catch((err) => dispatch(openSnackbar(err.response.data.message)));
  };

  return (
    <ModalVanilla
      open={open}
      handleClose={handleClose}
      title="刪除標籤"
      cancelBtn="先不要"
      confirmBtn="確定刪除"
      onConfirm={onConfirm}
    >
      <div>確定要刪除標籤？刪除後無法復原</div>
    </ModalVanilla>
  );
};

export default ModalDelete;
