import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './component/Header';
import AppRoutes from './Routes';
import { init } from './service/AppService';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateToHome = init();
    if (navigateToHome) navigate('/elementary');
  }, []);

  return (
    <div className="px-[15px] pb-10 sm:px-10 sm:pb-[70px]">
      <Header />
      <AppRoutes />
    </div>
  );
};

export default App;
