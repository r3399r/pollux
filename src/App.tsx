import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import H2 from './component/typography/H2';
import AppRoutes from './Routes';
import { init } from './service/AppService';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="px-[15px] pb-10 sm:px-10 sm:pb-[70px]">
      <div className="h-[70px] flex items-center justify-center md:p-6 md:justify-start border-b-[1px] border-b-beige-500">
        <H2
          className="cursor-pointer"
          onClick={() => {
            localStorage.removeItem('target');
            navigate('/');
          }}
        >
          無限 ∞ 算術
        </H2>
      </div>
      <AppRoutes />
    </div>
  );
};

export default App;
