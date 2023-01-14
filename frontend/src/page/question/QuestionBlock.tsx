import { QuestionType } from '@y-celestial/pollux-service';
import { useSelector } from 'react-redux';
import H3 from 'src/celestial-ui/component/typography/H3';
import Editor from 'src/component/Editor';
import { RootState } from 'src/redux/store';

type Props = {
  question: QuestionType;
};

const QuestionBlock = ({ question }: Props) => {
  const { tagList } = useSelector((rootState: RootState) => rootState.tag);

  return (
    <div className="my-3 p-4 rounded-lg border-2 border-solid border-grey-500">
      <div>標籤：{question.tagId.map((v) => tagList?.find((o) => o.id === v)?.name).join()}</div>
      <H3 className="my-3">題目</H3>
      <Editor disable hideToolbar initContent={question.content} />
      {question.answer && (
        <>
          <H3 className="my-3">答案</H3>
          <Editor disable hideToolbar initContent={question.answer} />
        </>
      )}
      {question.solution && (
        <>
          <H3 className="my-3">詳解</H3>
          <Editor disable hideToolbar initContent={question.solution} />
        </>
      )}
    </div>
  );
};

export default QuestionBlock;
