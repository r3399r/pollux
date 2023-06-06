import { MathJax } from 'better-react-mathjax';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QaForm, Question } from 'src/model/Common';
import { randomIntBetween } from 'src/util/math';

const Add = () => {
  const [question, setQuestion] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [history, setHistory] = useState<Question[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<QaForm>();

  const generate = useCallback(() => {
    const answer = randomIntBetween(2, 9);
    const a = randomIntBetween(1, answer - 1);
    const b = answer - a;
    setQuestion(`\\(${a}+${b}=\\square\\)`);
    setAnswer(String(answer));
  }, []);

  const onSubmit = (data: QaForm) => {
    if (data.answer === answer && question && answer) {
      setHistory([...history, { question, answer }]);
      generate();
      reset();
    } else setError('answer', {}, { shouldFocus: true });
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <MathJax renderMode="pre">
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
            className={classNames('border-2 rounded-md', {
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
