import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { closeSnackbar } from 'src/redux/uiSlice';

const Snackbar = () => {
  const {
    snackbarOpen: open,
    snackbarSeverity: severity,
    snackbarMessage: message,
  } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeSnackbar());

  return (
    <MuiSnackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert severity={severity}>{message}</Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
