import Menu from './component/Menu';
import AppRoutes from './Routes';

const App = () => (
  <div className="px-[15px] pb-10 sm:px-10 sm:pb-[70px]">
    <div className="h-[70px] flex items-center justify-center md:p-6 md:justify-start border-b-[1px] border-b-beige-500">
      ∞ 算術
    </div>
    <div className="flex pt-[30px]">
      <div className="hidden md:block w-[296px] h-[calc(100vh-140px)] md:h-[calc(100vh-170px)]">
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

export default App;
