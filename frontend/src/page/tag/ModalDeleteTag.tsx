import { useDispatch } from 'react-redux';
import ModalVanilla from 'src/component/celestial-ui/ModalVanilla';
import { openSnackbar } from 'src/redux/uiSlice';
import { deleteTag } from 'src/service/tagService';

type Props = {
  open: boolean;
  handleClose: () => void;
  tagId?: string;
};

const ModalDeleteTag = ({ open, handleClose, tagId }: Props) => {
  const dispatch = useDispatch();

  const onDelete = () => {
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
      deleteBtn="確定刪除"
      onDelete={onDelete}
    >
      <div>確定要刪除標籤？刪除後無法復原</div>
    </ModalVanilla>
  );
};

export default ModalDeleteTag;
