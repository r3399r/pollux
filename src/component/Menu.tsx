import { useNavigate } from 'react-router-dom';
import { Type, TypeName } from 'src/model/Common';
import Body from './typography/Body';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[5px] rounded-[15px] bg-olive-500 h-full text-white px-[10px] py-5 overflow-y-auto">
      {Object.values(Type).map((v, i) => (
        <Body key={i} onClick={() => navigate(`/${v}`)} className="cursor-pointer py-2 px-5">
          {TypeName[v]}
        </Body>
      ))}
    </div>
  );
};

export default Menu;
