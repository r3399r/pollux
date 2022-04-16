import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from 'src/component/FormInput';
import style from './TransferForm.module.scss';

type Form = {
  token: string;
};

type TransferFormProps = {
  onSubmit: (token: string) => void;
};

const TransferForm = ({ onSubmit }: TransferFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>();
  const [open, setOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string>('xx');

  const handleClickOpen = (data: Form) => {
    setOpen(true);
    setToken(data.token);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    handleClose();
    onSubmit(token);
    reset();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(handleClickOpen)}>
      <FormInput
        control={control}
        name="token"
        label="代碼"
        type="string"
        rules={{ required: true }}
        error={errors.token !== undefined}
        size="small"
      />
      <Button variant="outlined" type="submit">
        轉移
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>確定轉移</DialogTitle>
        <DialogContent>
          <DialogContentText>此動作將會覆蓋此環境的使用紀錄，覆蓋後將無法回復</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleConfirm}>確定</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default TransferForm;
