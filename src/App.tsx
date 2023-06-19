import Menu from './component/Menu';
import AppRoutes from './Routes';

const App = () => (
  <>
    <div className="h-[70px] p-[15px] flex items-center justify-center sm:p-10 md:p-6 md:justify-start">
      ∞ 算術
    </div>
    <div className="flex">
      <div className="hidden md:block w-[296px] h-screen bg-blue-50 overflow-y-auto">
        <Menu />
      </div>
      <div className="flex-1">
        <div className="box-border h-screen overflow-y-auto mx-[15px] sm:mx-10 lg:w-[1024px] lg:mx-auto">
          <AppRoutes />
        </div>
      </div>
    </div>
  </>
);

export default App;
