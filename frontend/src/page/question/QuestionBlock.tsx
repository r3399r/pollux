import { QuestionType } from '@y-celestial/pollux-service';
import { MathJax } from 'better-react-mathjax';
import { useSelector } from 'react-redux';
import H3 from 'src/celestial-ui/component/typography/H3';
import { RootState } from 'src/redux/store';

const InnerHTML = ({ content }: { content: string }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);

type Props = {
  question: QuestionType;
};

const QuestionBlock = ({ question }: Props) => {
  const { tagList } = useSelector((rootState: RootState) => rootState.tag);

  return (
    <div className="my-3 p-4 rounded-lg bg-green-300 ck-content">
      <div>標籤：{question.tagId.map((v) => tagList?.find((o) => o.id === v)?.name).join()}</div>
      <H3 className="my-3">題目</H3>
      {question.isMathjax ? (
        <MathJax>
          <InnerHTML content={question.content} />
        </MathJax>
      ) : (
        <InnerHTML content={question.content} />
      )}
      {question.answer && (
        <>
          <H3 className="my-3">答案</H3>
          {question.isMathjax ? (
            <MathJax>
              <InnerHTML content={question.answer} />
            </MathJax>
          ) : (
            <InnerHTML content={question.answer} />
          )}
        </>
      )}
      {question.solution && (
        <>
          <H3 className="my-3">詳解</H3>
          {question.isMathjax ? (
            <MathJax>
              <InnerHTML content={question.solution} />
            </MathJax>
          ) : (
            <InnerHTML content={question.solution} />
          )}
        </>
      )}
    </div>
  );
};

export default QuestionBlock;
