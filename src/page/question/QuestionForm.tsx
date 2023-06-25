import { Popover } from '@mui/material';
import classNames from 'classnames';
import { MouseEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Button from 'src/component/Button';
import Body from 'src/component/typography/Body';
import H4 from 'src/component/typography/H4';
import IcCross from 'src/image/ic-cross.svg';
import IcHint from 'src/image/ic-hint.svg';
import { QaForm, Question, Type } from 'src/model/Common';
import { setCurrentHasViewed } from 'src/service/QuestionService';

type Props = {
  initQuestion: (next: boolean, save?: boolean) => void;
  current?: Question;
};

const QuestionForm = ({ initQuestion, current }: Props) => {
  const { type } = useParams<{ type: Type }>();
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

  useEffect(() => {
    setValue('ans', '');
    setFocus('ans');
    reset();
  }, [current]);

  const onSubmit = (data: QaForm) => {
    if (current && current.validate.includes(data.ans)) {
      initQuestion(true, !ansViewed && !current.hasViewed);
      setValue('ans', '');
      setAnsViewed(false);
    } else setError('ans', {}, { shouldFocus: true });
  };

  const onViewAnswer = (event: MouseEvent<HTMLDivElement>) => {
    if (!type) return;
    setAnchorEl(event.currentTarget);
    setCurrentHasViewed(type);
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
          {current?.q && <div>{current.q}</div>}
        </div>
        <div className="relative mt-[30px]">
          <input
            className={classNames('outline-2 rounded-lg bg-beige-200 pl-[72px] py-4 pr-4 w-full', {
              'outline-brickred-500': errors.ans,
              'outline-beige-200': !errors.ans,
            })}
            autoComplete="off"
            // inputMode="decimal"
            type="text"
            {...register('ans')}
          />
          <Body bold className="absolute top-[50%] left-4 translate-y-[-50%] text-navy-300">
            回答：
          </Body>
        </div>
        <div className="mt-[30px] flex gap-[5px] justify-between items-start">
          {errors.ans ? (
            <div className="text-brickred-500">
              <div className="flex gap-[5px] items-center flex-wrap">
                <img src={IcCross} />
                <Body className="underline" onClick={onViewAnswer}>
                  按我看參考答案
                </Body>
              </div>
              <Body>看過後將不計入答題紀錄</Body>
            </div>
          ) : (
            <div />
          )}
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
              <H4 className="text-haze-500 mt-[15px]">Ex. {current.hint.example}</H4>
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
