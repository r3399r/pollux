import style from './App.module.scss';
import Navbar from './component/Navbar';
import AppRoutes from './Routes';

const App = () => (
  <>
    <div className={style.navbar}>
      <Navbar />
    </div>
    <div className={style.container}>
      <AppRoutes />
    </div>
  </>
);

export default App;
