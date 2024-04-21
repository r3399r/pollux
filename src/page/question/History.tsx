import classNames from 'classnames';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Body from 'src/component/typography/Body';
import { SavedQuestionValues } from 'src/model/Common';
import { topics } from 'src/model/Topics';

type Props = {
  history: SavedQuestionValues[];
  isDrawer?: boolean;
  onRemoveRecord: () => void;
};

const History = ({ history, isDrawer = false, onRemoveRecord }: Props) => {
  const { stage, topic } = useParams<{ stage: string; topic: string }>();
  const currentTopic = useMemo(() => topics.find((t) => t.id === topic), [topic]);

  return (
    <div
      className={classNames('flex flex-col gap-[10px]', {
        'p-5': isDrawer,
        'mr-[30px]': !isDrawer,
      })}
    >
      <div className={classNames('flex justify-between items-end', { 'my-[10px]': isDrawer })}>
        <Body
          className={classNames('cursor-pointer w-fit', {
            'text-orange-700': stage === 'elementary',
            'text-olive-700': stage === 'junior-high',
            'text-haze-700': stage === 'senior-high',
          })}
          onClick={onRemoveRecord}
        >
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
          {currentTopic?.factory?.question && v.qp && (
            <div>{currentTopic.factory.question(...v.qp)}</div>
          )}
          {currentTopic?.factory.image && v.qp && <img src={currentTopic.factory.image(...v.qp)} />}
          {currentTopic?.factory?.answer && v.ap && (
            <Body className="mt-1">
              <span className="mr-[10px]">答:</span>
              {currentTopic.factory.answer(...v.ap)}
            </Body>
          )}
        </div>
      ))}
    </div>
  );
};

export default History;
