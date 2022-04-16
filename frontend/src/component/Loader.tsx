import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

const Loader = () => {
  const { isLoading } = useSelector((state: RootState) => state.ui);

  return (
    <Backdrop open={isLoading}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Loader;
