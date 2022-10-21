import Loader from './component/Loader';
import Navbar from './component/Navbar';
import Routes from './Routes';

const App = () => (
  <>
    <Navbar />
    <div className="p-5">
      <Routes />
    </div>
    <Loader />
  </>
);

export default App;
