import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Type, TypeName } from 'src/model/Common';
import Body from './typography/Body';

type Props = {
  isDrawer?: boolean;
  onClick?: () => void;
};

const Menu = ({ isDrawer = false, onClick }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className={classNames(
        'flex flex-col gap-[5px] bg-olive-500 h-full text-white px-[10px] py-5 overflow-y-auto',
        {
          'rounded-[15px]': !isDrawer,
        },
      )}
    >
      {Object.values(Type).map((v, i) => (
        <Body
          key={i}
          onClick={() => {
            onClick && onClick();
            navigate(`/${v}`);
          }}
          className="cursor-pointer py-2 px-5"
        >
          {TypeName[v]}
        </Body>
      ))}
    </div>
  );
};

export default Menu;
