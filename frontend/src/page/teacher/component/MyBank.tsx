import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PageviewIcon from '@mui/icons-material/Pageview';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@mui/material';
import { Bank } from '@y-celestial/pollux-service';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Page } from 'src/constant/Page';
import { openSnackbar, showLoading } from 'src/redux/uiSlice';
import { deleteBank, getBank } from 'src/service/bankService';
import style from './MyBank.module.scss';

const MyBank = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [banks, setBanks] = useState<Bank[]>([]);
  const [deletedId, setDeletedId] = useState<string>();

  useEffect(() => {
    getBank().then((res) => setBanks(res));
  }, []);

  const handleOpen = (id: string) => () => {
    setDeletedId(id);
  };

  const handleClose = () => {
    setDeletedId(undefined);
  };

  const onDelete = () => {
    if (deletedId === undefined) return;
    setDeletedId(undefined);
    dispatch(showLoading(true));
    deleteBank(deletedId)
      .then(() => {
        dispatch(openSnackbar({ severity: 'success', message: '刪除成功' }));
        setBanks(banks.filter((v) => v.id !== deletedId));
      })
      .catch(() => {
        dispatch(openSnackbar({ severity: 'error', message: '刪除失敗' }));
      })
      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  return (
    <>
      <div className={style.self}>
        <Button variant="contained" onClick={() => navigate(Page.NewBank)}>
          建立新題庫
        </Button>
        {banks.map((v) => (
          <Card key={v.id} className={style.card} variant="outlined">
            <div className={style.head}>
              <div>{format(v.dateCreated ?? Date.now(), 'yyyy-MM-dd')}</div>
              <div className={style.flex}>{v.name}</div>
              <div>
                <IconButton size="small" onClick={() => navigate(`${Page.Bank}/${v.id}`)}>
                  <PageviewIcon />
                </IconButton>
                <IconButton size="small" onClick={handleOpen(v.id)}>
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Dialog open={deletedId !== undefined} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>確認要刪除此題庫，刪除後無法用任何方法回復。</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={onDelete} autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyBank;
