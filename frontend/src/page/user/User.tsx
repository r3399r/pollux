import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'src/redux/uiSlice';
import { getTransferCode, getUser } from 'src/service/userService';

const User = () => {
  const [user, setUser] = useState<any>();
  const [code, setCode] = useState<string>();
  const [showTransferForm, setShowTransferForm] = useState<boolean>();
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const onTransferOut = () => {
    setCode(getTransferCode());
  };

  const onCopy = () => {
    dispatch(openSnackbar({ severity: 'success', message: '已複製' }));
  };

  const onTransferIn = () => {
    setShowTransferForm(true);
  };

  return (
    <>
      <div>
        <h1>基本資料</h1>
        <p>ID: {user?.id}</p>
        <p>名稱: {user?.nickname}</p>
      </div>
      <div>
        <h1>轉移設備</h1>
        <div>
          <Button variant="outlined" onClick={onTransferOut}>
            轉出
          </Button>
          {code && (
            <div>
              {code}
              <CopyToClipboard text={code} onCopy={onCopy}>
                <ContentCopyIcon />
              </CopyToClipboard>
            </div>
          )}
        </div>
        <div>
          <Button variant="outlined" onClick={onTransferIn}>
            轉入
          </Button>
          {showTransferForm && <div>aa</div>}
        </div>
      </div>
    </>
  );
};

export default User;
