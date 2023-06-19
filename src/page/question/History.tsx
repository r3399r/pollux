import Body from 'src/component/typography/Body';
import { SavedQuestion } from 'src/model/Common';

type Props = {
  history: SavedQuestion[];
};

const History = ({ history }: Props) => (
  <div className="flex flex-col gap-[10px] mr-[30px]">
    {history?.map((v) => (
      <div key={v.id} className="border-[1px] border-beige-500 rounded-[10px] p-5">
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
