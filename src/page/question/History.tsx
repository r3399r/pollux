import classNames from 'classnames';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Body from 'src/component/typography/Body';
import { SavedQuestion, topics } from 'src/model/Common';

type Props = {
  history: SavedQuestion[];
  isDrawer?: boolean;
  onRemoveRecord: () => void;
};

const History = ({ history, isDrawer = false, onRemoveRecord }: Props) => {
  const { topic } = useParams<{ topic: string }>();
  const currentTopic = useMemo(() => topics.find((t) => t.id === topic), [topic]);

  return (
    <div
      className={classNames('flex flex-col gap-[10px]', {
        'p-5': isDrawer,
        'mr-[30px]': !isDrawer,
      })}
    >
      <div className={classNames('flex justify-between items-end', { 'my-[10px]': isDrawer })}>
        <Body className="text-olive-700 cursor-pointer w-fit" onClick={onRemoveRecord}>
          清除答題紀錄
        </Body>
        <Body size="m" className="text-navy-300">
          共答對 {history.length} 題
        </Body>
      </div>
      {history?.map((v) => (
        <div key={v.id} className="border-[1px] border-beige-500 rounded-[10px] p-5">
          <Body size="s" className="text-navy-300">
            {format(new Date(v.t), 'yyyy.MM.dd HH:mm:ss')}
          </Body>
          {v.img && <img src={v.img} />}
          {currentTopic?.generator?.question && (
            <div>{currentTopic.generator.question(...(v.qp ?? []))}</div>
          )}
          <Body className="mt-1">
            <span className="mr-[10px]">答:</span>
            {v.a}
          </Body>
        </div>
      ))}
    </div>
  );
};

export default History;
