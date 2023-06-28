import { useEffect } from 'react';
import Menu from './component/Menu';
import H2 from './component/typography/H2';
import AppRoutes from './Routes';
import { init } from './service/AppService';

const App = () => {
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="px-[15px] pb-10 sm:px-10 sm:pb-[70px]">
      <div className="h-[70px] flex items-center justify-center md:p-6 md:justify-start border-b-[1px] border-b-beige-500">
        <H2>無限 ∞ 算術</H2>
      </div>
      <div className="flex pt-[30px]">
        <div className="hidden md:block w-[256px] h-[calc(100vh-140px)] md:h-[calc(100vh-170px)]">
          <Menu />
        </div>
        <div className="flex-1">
          <div className="box-content md:px-10 lg:max-w-[1024px] lg:mx-auto">
            <AppRoutes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
