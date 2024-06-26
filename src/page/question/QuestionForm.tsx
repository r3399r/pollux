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
import IcLevelBeige from 'src/image/ic-level-beige.svg';
import IcLevelHaze from 'src/image/ic-level-haze.svg';
import IcLevelOlive from 'src/image/ic-level-olive.svg';
import IcLevelOrange from 'src/image/ic-level-orange.svg';
import { QaForm, QuestionValues } from 'src/model/Common';
import { topics } from 'src/model/Topics';
import { onCorrectAnswer, onWrongAnswer, setAnswerIsRevealed } from 'src/service/QuestionService';

type Props = {
  initQuestion: (next: boolean, save?: boolean) => void;
  current?: QuestionValues;
};

const QuestionForm = ({ initQuestion, current }: Props) => {
  const { stage, topic } = useParams<{ stage: string; topic: string }>();
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
  const maxLevel = useMemo(() => currentTopic?.levelDefinition?.length ?? 1, [currentTopic]);

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
        <div className="flex mb-[30px] items-center">
          <Body size="m" className="text-navy-300 mr-[5px]">
            難度
          </Body>
          {[...Array(maxLevel)].map((v, i) => {
            const level = Number(localStorage.getItem(`${topic}-level`) ?? '0');
            if (level < i) return <img key={i} src={IcLevelBeige} />;
            if (stage === 'elementary') return <img key={i} src={IcLevelOrange} />;
            if (stage === 'junior-high') return <img key={i} src={IcLevelOlive} />;

            return <img key={i} src={IcLevelHaze} />;
          })}
        </div>
        <div className="flex justify-center">
          {currentTopic?.factory?.question && current?.qp && (
            <div className="text-center">{currentTopic.factory.question(...current.qp)}</div>
          )}
          {currentTopic?.factory.image && current?.qp && (
            <img src={currentTopic.factory.image(...current.qp)} />
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
        {currentTopic?.hint && (
          <div className="mt-[30px] rounded-[10px] bg-haze-100 p-5 flex gap-5 items-start">
            <img src={IcHint} />
            <ul>
              {currentTopic.hint.rules.map((v, i) => (
                <li className="text-navy-500 list-['-'] pl-[5px]" key={i}>
                  {v}
                </li>
              ))}
              <H4 className="text-haze-500 mt-[15px]">例: {currentTopic.hint.example}</H4>
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
