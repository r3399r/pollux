import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { QaForm, Question } from 'src/model/Common';

type Props = {
  initQuestion: (next: boolean) => void;
  current?: Question;
};

const QuestionForm = ({ initQuestion, current }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<QaForm>();

  const onSubmit = (data: QaForm) => {
    if (current && current.v.includes(data.ans)) {
      initQuestion(true);
      setValue('ans', '');
    } else setError('ans', {}, { shouldFocus: true });
  };

  return (
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
  );
};
export default QuestionForm;
