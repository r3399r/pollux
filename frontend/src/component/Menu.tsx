import { useNavigate } from 'react-router-dom';
import { LanguageMapping, Type } from 'src/model/Common';

const zhTW: LanguageMapping = {
  add10: '10以內的加法',
  minus10: '10以內的減法',
  add20: '20以內的加法',
  minus20: '20以內的減法',
  gcf: '最大公因數',
};

const Menu = () => {
  const navigate = useNavigate();

  return (
    <>
      {Object.values(Type).map((v, i) => (
        <div key={i} onClick={() => navigate(`/${v}`)} className="cursor-pointer mt-3 px-3">
          {zhTW[v]}
        </div>
      ))}
    </>
  );
};

export default Menu;
