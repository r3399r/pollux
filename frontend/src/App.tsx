import { useSelector } from 'react-redux';
import style from './App.module.scss';
import Loader from './component/Loader';
import Navbar from './component/Navbar';
import Snackbar from './component/Snackbar';
import { RootState } from './redux/store';
import AppRoutes from './Routes';

const App = () => {
  const { isLoading } = useSelector((state: RootState) => state.ui);

  return (
    <>
      <div className={style.navbar}>
        <Navbar />
      </div>
      <div className={style.container}>
        <AppRoutes />
      </div>
      <Snackbar />
      {isLoading && <Loader />}
    </>
  );
};

export default App;
