import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import FormInput from 'src/component/celestial-ui/FormInput';
import ModalForm from 'src/component/celestial-ui/ModalForm';
import { EditTagForm } from 'src/model/Form';
import { RootState } from 'src/redux/store';
import { editTag } from 'src/service/tagService';

type Props = {
  open: boolean;
  handleClose: () => void;
  tagId?: string;
};

const ModalEditTag = ({ open, handleClose, tagId }: Props) => {
  const methods = useForm<EditTagForm>();
  const { tagList } = useSelector((rootState: RootState) => rootState.tag);

  useEffect(() => {
    if (!tagId || !tagList) return;
    methods.setValue('name', tagList.find((v) => v.id === tagId)?.name ?? '');
  }, [tagId, tagList]);

  const onClose = () => {
    handleClose();
    methods.reset();
  };

  const onSubmit = (data: EditTagForm) => {
    if (tagId === undefined) return;
    editTag(tagId, data.name).then(onClose);
  };

  return (
    <ModalForm
      methods={methods}
      onSubmit={onSubmit}
      open={open}
      handleClose={onClose}
      title="編輯標籤"
      cancelBtn="取消"
      confirmBtn="送出"
    >
      <FormInput name="name" placeholder="標籤名稱" autoFocus required />
    </ModalForm>
  );
};

export default ModalEditTag;
