import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from 'src/component/Menu';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const target = localStorage.getItem('target');
    if (target) navigate(`/${target}`);
  }, []);

  return (
    <div className="h-[calc(100vh-140px)] pt-[30px] flex justify-center">
      <Menu />
    </div>
  );
};

export default Home;
