import style from './App.module.scss';
import Loader from './component/Loader';
import Navbar from './component/Navbar';
import Snackbar from './component/Snackbar';
import AppRoutes from './Routes';

const App = () => (
  <>
    <div className={style.navbar}>
      <Navbar />
    </div>
    <div className={style.container}>
      <AppRoutes />
    </div>
    <Snackbar />
    <Loader />
  </>
);

export default App;
