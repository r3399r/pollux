import { useForm } from 'react-hook-form';
import FormInput from 'src/component/celestial-ui/FormInput';
import ModalForm from 'src/component/celestial-ui/ModalForm';
import { NewTagForm } from 'src/model/Form';
import { createTag } from 'src/service/tagService';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const ModalNewTag = ({ open, handleClose }: Props) => {
  const methods = useForm<NewTagForm>();

  const onClose = () => {
    handleClose();
    methods.reset();
  };

  const onSubmit = (data: NewTagForm) => {
    createTag(data.name).then(onClose);
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