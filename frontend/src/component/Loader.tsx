import { useSelector } from 'react-redux';
import CelestialLoader from 'src/celestial-ui/component/Loader';
import { RootState } from 'src/redux/store';

const Loader = () => {
  const { workload } = useSelector((rootState: RootState) => rootState.ui);

  return <CelestialLoader open={workload > 0} />;
};

export default Loader;
