import { MathJax } from 'better-react-mathjax';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import H2 from 'src/component/typography/H2';
import { Question, SavedQuestion, Type, TypeName } from 'src/model/Common';
import { handleQuestion } from 'src/service/QuestionService';
import History from './History';
import QuestionForm from './QuestionForm';

const QuestionPage = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: Type }>();
  const [current, setCurrent] = useState<Question>();
  const [history, setHistory] = useState<SavedQuestion[]>([]);

  const initQuestion = (next: boolean) => {
    if (!type) return;
    try {
      const { history, ...res } = handleQuestion(type, next);
      setCurrent(res);
      setHistory(history);
    } catch (e) {
      navigate('/add10');
    }
  };

  // const onClear = () => {
  //   localStorage.clear();
  //   initQuestion(false);
  //   setHistory([]);
  // };

  useEffect(() => {
    initQuestion(false);
  }, [type]);

  return (
    <MathJax dynamic>
      <H2 className="mt-0 md:mt-[30px] pb-7">{type && TypeName[type]}</H2>
      {/* <button className="border-2 border-black rounded-md" onClick={onClear}>
        Clear All
      </button> */}
      <div className="flex">
        <div className="hidden md:block w-1/2 h-[calc(100vh-140px-92px)] md:h-[calc(100vh-170px-92px)] overflow-y-auto">
          <History history={history} />
        </div>
        <div className="w-full md:w-1/2 h-[calc(100vh-140px-92px)] bg-white md:h-[calc(100vh-170px-92px)] overflow-y-auto">
          <QuestionForm initQuestion={initQuestion} current={current} />
        </div>
      </div>
    </MathJax>
  );
};

export default QuestionPage;
