import { useNavigate } from 'react-router-dom';
import { LangZhTw, Type } from 'src/model/Common';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <>
      {Object.values(Type).map((v, i) => (
        <div key={i} onClick={() => navigate(`/${v}`)} className="cursor-pointer mt-3 px-3">
          {LangZhTw[v]}
        </div>
      ))}
    </>
  );
};

export default Menu;
