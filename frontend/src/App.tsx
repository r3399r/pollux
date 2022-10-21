import Loader from './component/Loader';
import Navbar from './component/Navbar';
import Snackbar from './component/Snackbar';
import Routes from './Routes';

const App = () => (
  <>
    <Navbar />
    <div className="p-5">
      <Routes />
    </div>
    <Loader />
    <Snackbar />
  </>
);

export default App;
