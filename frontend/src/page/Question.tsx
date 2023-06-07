import { MathJax } from 'better-react-mathjax';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Generator, QaForm, Question } from 'src/model/Common';
import { generate } from 'src/service/QuestionService';

const Add = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: keyof Generator }>();
  const [question, setQuestion] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [history, setHistory] = useState<Question[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<QaForm>();

  const initQuestion = () => {
    if (!type) return;
    try {
      const res = generate(type);
      setQuestion(res.question);
      setAnswer(res.answer);
    } catch (e) {
      navigate('/add');
    }
  };

  const onSubmit = (data: QaForm) => {
    if (data.answer === answer && question && answer) {
      initQuestion();
      setHistory([...history, { question, answer }]);
      setValue('answer', '');
    } else setError('answer', {}, { shouldFocus: true });
  };

  useEffect(() => {
    initQuestion();
  }, [type]);

  return (
    <MathJax dynamic>
      {history?.map((v, i) => (
        <div key={i} className="text-center">
          {v.question}
          <br />
          Ans: {v.answer}
        </div>
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">{question}</div>
        <div className="text-center">
          <span>答: </span>
          <input
            className={classNames('border-2 rounded-md focus:outline-none', {
              'border-red-500': errors.answer,
              'border-black': !errors.answer,
            })}
            autoComplete="off"
            type="text"
            {...register('answer', { required: true })}
          />
        </div>
        <div className="text-center">
          <button className="border-2 border-black rounded-md" type="submit">
            確認
          </button>
        </div>
      </form>
    </MathJax>
  );
};

export default Add;
