import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import CelestialLoader from './celestial-ui/Loader';

const Loader = () => {
  const { workload } = useSelector((rootState: RootState) => rootState.ui);

  return <CelestialLoader open={workload > 0} />;
};

export default Loader;
