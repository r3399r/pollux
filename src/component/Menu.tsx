import classNames from 'classnames';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { category } from 'src/model/Categories';
import { topics } from 'src/model/Topics';
import Accordion from './Accordion';

type Props = {
  isDrawer?: boolean;
  onCloseDrawer?: () => void;
};

const Menu = ({ isDrawer = false, onCloseDrawer }: Props) => {
  const { stage, topic } = useParams<{ stage: string; topic: string }>();
  const navigate = useNavigate();
  const currentCategories = useMemo(
    () => Object.values(category).filter((c) => c.stage.key === stage),
    [stage],
  );

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
      {currentCategories.map((c) => {
        const currentTopics = topics.filter((t) => t.category.key === c.key);

        return (
          <Accordion
            key={c.key}
            summary={c.name}
            details={currentTopics.map((t) => t.name)}
            current={currentTopics.find((t) => t.id === topic)?.name ?? ''}
            onClickDetail={(name) => {
              const target = currentTopics.find((t) => t.name === name)?.id ?? '';
              navigate(`/${stage}/${target}`);
              localStorage.setItem('target', target);
              onCloseDrawer && onCloseDrawer();
            }}
            expanded={!!currentTopics.find((t) => t.id === topic)}
          />
        );
      })}
    </div>
  );
};

export default Menu;
