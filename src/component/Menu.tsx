import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { Type, TypeName } from 'src/model/Common';
import Accordion from './Accordion';
import Body from './typography/Body';

type Props = {
  isDrawer?: boolean;
  onClick?: () => void;
};

const Menu = ({ isDrawer = false, onClick }: Props) => {
  const { type } = useParams<{ type: Type }>();
  const navigate = useNavigate();
  console.log(type);

  return (
    <div
      className={classNames(
        'flex flex-col gap-[5px] bg-olive-500 h-full text-white px-[15px] py-5 overflow-y-auto',
        {
          'rounded-[15px]': !isDrawer,
        },
      )}
    >
      <Accordion summary="小學數學" details={['add10', 'b', 'c']} current={'add10'} />
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
