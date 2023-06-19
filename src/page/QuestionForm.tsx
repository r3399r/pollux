import { Popover } from '@mui/material';
import classNames from 'classnames';
import { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/component/Button';
import Body from 'src/component/typography/Body';
import H4 from 'src/component/typography/H4';
import IcCross from 'src/image/ic-cross.svg';
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
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const onSubmit = (data: QaForm) => {
    if (current && current.v.includes(data.ans)) {
      initQuestion(true);
      setValue('ans', '');
    } else setError('ans', {}, { shouldFocus: true });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white h-full p-[30px] sm:p-[60px] md:px-[30px] md:pt-[40px] lg:p-[60px]"
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
            type="text"
            {...register('ans', { required: true })}
          />
          <Body bold className="absolute top-[50%] left-4 translate-y-[-50%] text-navy-300">
            回答：
          </Body>
        </div>
        <div className="mt-[30px] flex justify-between items-start">
          {errors.ans ? (
            <div className="text-brickred-500">
              <div className="flex gap-[5px] items-center flex-wrap">
                <img src={IcCross} />
                <Body>答錯了</Body>
              </div>
              <Body
                className="underline"
                onClick={(event: MouseEvent<HTMLDivElement>) => setAnchorEl(event.currentTarget)}
              >
                看參考答案
              </Body>
            </div>
          ) : (
            <div />
          )}
          <Button type="submit">確認</Button>
        </div>
        {current?.h && <div>{current.h}</div>}
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
          <H4 className="text-white">{current?.v ? current.v[0] : ''}</H4>
        </div>
      </Popover>
    </>
  );
};
export default QuestionForm;
