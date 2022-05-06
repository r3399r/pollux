import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Page } from 'src/constant/Page';
import style from './MyBank.module.scss';

const MyBank = () => {
  const navigate = useNavigate();

  return (
    <div className={style.self}>
      <Button variant="contained" onClick={() => navigate(Page.NewBank)}>
        建立新題庫
      </Button>
    </div>
  );
};

export default MyBank;
