import { Backdrop, CircularProgress } from '@mui/material';
type LoaderProps = {
  hide?: boolean;
};

const Loader = ({ hide = false }: LoaderProps) => (
  <Backdrop open={!hide}>
    <CircularProgress />
  </Backdrop>
);

export default Loader;
