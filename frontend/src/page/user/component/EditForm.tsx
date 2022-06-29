import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import FormInput from 'src/component/FormInput2';
import { openSnackbar, showLoading } from 'src/redux/uiSlice';
import { editNickname } from 'src/service/userService';
import style from './EditForm.module.scss';

type Form = {
  nickname: string;
};

type EditFormProps = {
  reset: (name?: string) => void;
};

const EditForm = ({ reset }: EditFormProps) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = (data: Form) => {
    dispatch(showLoading(true));
    editNickname(data)
      .catch(() => {
        dispatch(openSnackbar({ severity: 'error', message: '設定名稱失敗' }));
      })
      .finally(() => {
        reset(data.nickname);
        dispatch(showLoading(false));
      });
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        control={control}
        name="nickname"
        type="string"
        rules={{ required: true }}
        error={errors.nickname !== undefined}
        size="small"
      />
      <Button variant="outlined" type="submit">
        送出
      </Button>
      <Button variant="outlined" color="error" type="button" onClick={() => reset()}>
        取消
      </Button>
    </form>
  );
};

export default EditForm;
