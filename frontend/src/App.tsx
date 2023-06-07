import Menu from './component/Menu';
import AppRoutes from './Routes';

const App = () => (
  <div className="flex">
    <div className="w-1/4 h-screen bg-blue-50">
      <Menu />
    </div>
    <div className="w-3/4 h-screen">
      <AppRoutes />
    </div>
  </div>
);

export default App;
