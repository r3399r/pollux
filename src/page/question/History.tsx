import classNames from 'classnames';
import { format } from 'date-fns';
import Body from 'src/component/typography/Body';
import { SavedQuestion } from 'src/model/Common';

type Props = {
  history: SavedQuestion[];
  isDrawer?: boolean;
  onRemoveRecord: () => void;
};

const History = ({ history, isDrawer = false, onRemoveRecord }: Props) => (
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
        {v.q && <div>{v.q}</div>}
        <Body className="mt-1">
          <span className="mr-[10px]">Ans:</span>
          {v.a}
        </Body>
      </div>
    ))}
  </div>
);

export default History;
