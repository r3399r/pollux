import { MathJax } from 'better-react-mathjax';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { QaForm, Question, Type } from 'src/model/Common';
import { handleQuestion } from 'src/service/QuestionService';

const Add = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: Type }>();
  const [current, setCurrent] = useState<Question>();
  const [history, setHistory] = useState<Question[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<QaForm>();

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

  const onSubmit = (data: QaForm) => {
    if (current && current.v.includes(data.ans)) {
      initQuestion(true);
      setValue('ans', '');
    } else setError('ans', {}, { shouldFocus: true });
  };

  const onClear = () => {
    localStorage.clear();
    initQuestion(false);
    setHistory([]);
  };

  useEffect(() => {
    initQuestion(false);
  }, [type]);

  return (
    <MathJax dynamic>
      <button className="border-2 border-black rounded-md" onClick={onClear}>
        Clear All
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        {current?.img && <img src={current.img} />}
        {current?.q && <div>{current.q}</div>}
        <div>
          <span>答: </span>
          <input
            className={classNames('border-2 rounded-md focus:outline-none', {
              'border-red-500': errors.ans,
              'border-black': !errors.ans,
            })}
            autoComplete="off"
            type="text"
            {...register('ans', { required: true })}
          />
        </div>
        <div className="text-center">
          <button className="border-2 border-black rounded-md" type="submit">
            確認
          </button>
        </div>
        {current?.h && <div>{current.h}</div>}
      </form>
      {history?.map((v) => (
        <div key={v.id} className="flex flex-col items-center">
          {v.img && <img src={v.img} />}
          {v.q && <div>{v.q}</div>}
          <div>答: {v.a}</div>
        </div>
      ))}
    </MathJax>
  );
};

export default Add;
