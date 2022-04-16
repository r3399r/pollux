import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { openSnackbar, showLoading } from 'src/redux/uiSlice';
import { activateUser, getUser, transferDevice } from 'src/service/userService';
import EditForm from './component/EditForm';
import TransferForm from './component/TransferForm';
import style from './User.module.scss';

const User = () => {
  const [id, setId] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  const [isTransfering, setIsTransfering] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token !== undefined && isTransfering === false)
      getUser()
        .then((res) => {
          setId(res.id);
          setNickname(res.nickname);
        })
        .catch(() => {
          dispatch(openSnackbar({ severity: 'error', message: '讀取使用者資料失敗' }));
        });
  }, [token, isTransfering]);

  const onEdit = () => {
    setShowEdit(true);
  };
  const reset = (name?: string) => {
    if (name !== undefined) setNickname(name);
    setShowEdit(false);
  };

  const onCopy = () => {
    dispatch(openSnackbar({ severity: 'success', message: '已複製' }));
  };

  const onActivate = () => {
    dispatch(showLoading(true));
    activateUser()
      .catch(() => {
        dispatch(openSnackbar({ severity: 'error', message: '啟用失敗，請重試' }));
      })
      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  const onSubmit = (token: string) => {
    setIsTransfering(true);
    transferDevice(token)
      .then((res) => {
        setId(res.id);
        setNickname(res.nickname);
      })
      .catch(() => {
        dispatch(openSnackbar({ severity: 'error', message: '代碼無效' }));
      });
  };

  if (token === undefined)
    return (
      <>
        <p>若您是第一次使用此網頁程式的功能，請點擊「啟用」。</p>
        <div className={style.margin}>
          <Button variant="outlined" onClick={onActivate}>
            啟用
          </Button>
        </div>
        <p>
          若您過去曾有使用過相關功能且想取回，請輸入前一裝置得到的代碼並點擊「轉移」以進行設定。
        </p>
        <div className={style.margin}>
          <TransferForm onSubmit={onSubmit} />
        </div>
      </>
    );

  return (
    <>
      <div>
        <h1>基本資料</h1>
        <div>ID: {id}</div>
        <div className={style.nickname}>
          <div>名稱:</div>
          {showEdit ? (
            <EditForm reset={reset} />
          ) : (
            <>
              <div>{nickname}</div>
              <div onClick={onEdit}>
                <EditIcon />
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <h1>轉移設備</h1>
        <h2>轉出</h2>
        <div>
          代碼: {token}
          <CopyToClipboard text={token} onCopy={onCopy}>
            <ContentCopyIcon />
          </CopyToClipboard>
        </div>
        <h2>轉入</h2>
        <TransferForm onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default User;
