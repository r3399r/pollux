import { Popover } from '@mui/material';
import classNames from 'classnames';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Button from 'src/component/Button';
import Body from 'src/component/typography/Body';
import H4 from 'src/component/typography/H4';
import IcCheck from 'src/image/ic-check.svg';
import IcCross from 'src/image/ic-cross.svg';
import IcHint from 'src/image/ic-hint.svg';
import { QaForm, Question, topics } from 'src/model/Common';
import { onCorrectAnswer, onWrongAnswer, setAnswerIsRevealed } from 'src/service/QuestionService';

type Props = {
  initQuestion: (next: boolean, save?: boolean) => void;
  current?: Question;
};

const QuestionForm = ({ initQuestion, current }: Props) => {
  const { topic } = useParams<{ topic: string }>();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<QaForm>();
  const [ansViewed, setAnsViewed] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const currentTopic = useMemo(() => topics.find((t) => t.id === topic), [topic]);

  useEffect(() => {
    setValue('ans', '');
    setFocus('ans');
    reset();
  }, [current]);

  const onSubmit = (data: QaForm) => {
    if (current && current.validate.includes(data.ans.trim().split(/[ ,]+/).join())) {
      if (topic) onCorrectAnswer(topic);
      setChecked(true);
      setTimeout(() => {
        initQuestion(true, !ansViewed && !current.isRevealed);
        setValue('ans', '');
        setAnsViewed(false);
        setChecked(false);
      }, 1000);
    } else {
      setError('ans', {}, { shouldFocus: true });
      if (topic) onWrongAnswer(topic);
    }
  };

  const onViewAnswer = (event: MouseEvent<HTMLDivElement>) => {
    if (!topic) return;
    setAnchorEl(event.currentTarget);
    setAnswerIsRevealed(topic);
    setAnsViewed(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-[30px] sm:p-[60px] md:px-[30px] md:py-[40px] lg:p-[60px]"
      >
        <div className="flex justify-center">
          {current?.img && <img src={current.img} />}
          {currentTopic?.generator?.question && current?.qp && (
            <div className="text-center">{currentTopic.generator.question(...current.qp)}</div>
          )}
        </div>
        <div className="relative mt-[30px]">
          <input
            className={classNames(
              'outline-2 border-0 rounded-lg bg-beige-200 pl-[72px] py-4 pr-4 w-full',
              {
                'outline-brickred-500': errors.ans,
                'outline-beige-200': !errors.ans,
              },
            )}
            autoComplete="off"
            type="text"
            disabled={checked}
            {...register('ans')}
          />
          <Body bold className="absolute top-[50%] left-4 translate-y-[-50%] text-navy-300">
            回答：
          </Body>
        </div>
        <div className="mt-[30px] flex gap-[5px] justify-between items-start">
          {errors.ans && (
            <div className="text-brickred-500">
              <div className="flex gap-[5px] items-center flex-wrap">
                <img src={IcCross} />
                <Body className="underline" onClick={onViewAnswer}>
                  按我看參考答案
                </Body>
              </div>
              <Body>看過後將不計入答題紀錄</Body>
            </div>
          )}
          {checked && (
            <div className="text-olive-700 flex gap-[5px]">
              <img src={IcCheck} />
              <Body>答對了！</Body>
            </div>
          )}
          {!errors.ans && !checked && <div />}
          <Button type="submit">確認</Button>
        </div>
        {current?.hint && (
          <div className="mt-[30px] rounded-[10px] bg-haze-100 p-5 flex gap-5 items-start">
            <img src={IcHint} />
            <ul>
              {current.hint.rules.map((v, i) => (
                <li className="text-navy-500 list-['-'] pl-[5px]" key={i}>
                  {v}
                </li>
              ))}
              <H4 className="text-haze-500 mt-[15px]">例: {current.hint.example}</H4>
            </ul>
          </div>
        )}
      </form>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: '!bg-brickred-500 !rounded-[10px]' }}
      >
        <div className="px-4 py-[10px] text-center">
          <Body size="m" className="text-beige-200">
            參考答案
          </Body>
          <H4 className="text-white">{current?.validate ? current.validate[0] : ''}</H4>
        </div>
      </Popover>
    </>
  );
};
export default QuestionForm;
