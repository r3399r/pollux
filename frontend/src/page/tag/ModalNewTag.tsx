import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import FormInput from 'src/celestial-ui/component/FormInput';
import ModalForm from 'src/celestial-ui/component/ModalForm';
import { NewTagForm } from 'src/model/Form';
import { openSnackbar } from 'src/redux/uiSlice';
import { createTag } from 'src/service/tagService';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const ModalNewTag = ({ open, handleClose }: Props) => {
  const dispatch = useDispatch();
  const methods = useForm<NewTagForm>();

  const onClose = () => {
    handleClose();
    methods.reset();
  };

  const onSubmit = (data: NewTagForm) => {
    createTag(data.name)
      .then(onClose)
      .catch((err) => dispatch(openSnackbar(err.response.data.message)));
  };

  return (
    <ModalForm
      methods={methods}
      onSubmit={onSubmit}
      open={open}
      handleClose={onClose}
      title="新增標籤"
      cancelBtn="取消"
      confirmBtn="送出"
    >
      <FormInput name="name" placeholder="標籤名稱" autoFocus required />
    </ModalForm>
  );
};

export default ModalNewTag;
