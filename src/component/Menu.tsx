import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryType, Type } from 'src/model/Common';
import Accordion from './Accordion';

type Props = {
  isDrawer?: boolean;
  onCloseDrawer?: () => void;
};

const Menu = ({ isDrawer = false, onCloseDrawer }: Props) => {
  const { type } = useParams<{ type: Type }>();
  const navigate = useNavigate();

  return (
    <div
      className={classNames(
        'flex flex-col gap-[5px] bg-olive-500 h-full text-white px-[15px] py-5 overflow-y-auto',
        {
          'rounded-[15px] w-[256px]': !isDrawer,
          'w-[300px]': isDrawer,
        },
      )}
    >
      {CategoryType.map((c) => (
        <Accordion
          key={c.category}
          summary={c.name}
          details={c.types.map((t) => t.name)}
          current={c.types.find((t) => t.type === type)?.name ?? ''}
          onClickDetail={(name) => {
            const target = c.types.find((v) => v.name === name)?.type;
            navigate(target ? `/${target}` : '/');
            if (target) localStorage.setItem('target', target);
            onCloseDrawer && onCloseDrawer();
          }}
          expanded={!!c.types.find((t) => t.type === type)}
        />
      ))}
    </div>
  );
};

export default Menu;
