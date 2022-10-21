import { SnackbarCloseReason } from '@mui/base';
import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { closeSnackbar } from 'src/redux/uiSlice';
import CelestialSnackbar from './celestial-ui/Snackbar';

const Snackbar = () => {
  const dispatch = useDispatch();
  const { showSnackbar, snackbarMessage } = useSelector((rootState: RootState) => rootState.ui);

  const handleClose = (event: Event | SyntheticEvent | null, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    dispatch(closeSnackbar());
  };

  return (
    <CelestialSnackbar open={showSnackbar} onClose={handleClose}>
      <>{snackbarMessage}</>
    </CelestialSnackbar>
  );
};

export default Snackbar;
