import { Autocomplete, Button, Card, createFilterOptions, Slider, TextField } from '@mui/material';
import { Label, Type } from '@y-celestial/pollux-service';
import { MathJax } from 'better-react-mathjax';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import FormCheckboxGroup from 'src/component/FormCheckboxGroup';
import FormInput from 'src/component/FormInput';
import FormRadio from 'src/component/FormRadio';
import FormSelect from 'src/component/FormSelect';
import Loader from 'src/component/Loader';
import { openSnackbar } from 'src/redux/uiSlice';
import { createLabel, createQuestion, getLabels } from 'src/service/questionService';
import style from './NewQuestion.module.scss';

type QuestionForm = {
  label: string;
  type: Type;
  question: string;
  answer: string;
};

const filter = createFilterOptions<string>();

const NewQuestion = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<QuestionForm>({
    defaultValues: {
      label: '',
    },
  });
  const dispatch = useDispatch();
  const [labels, setLabels] = useState<Label[]>();
  const [sliderValue, setSliderValue] = useState<number>(4);
  const [isCreatingLabel, setIsCreatingLabel] = useState<boolean>(false);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState<boolean>(false);

  const multipleOptions = useMemo(
    () => [...Array(sliderValue).keys()].map((v) => String(v + 1)),
    [sliderValue],
  );

  useEffect(() => {
    getLabels().then((res) => setLabels(res));
  }, []);

  useEffect(() => {
    setValue('answer', '');
    setSliderValue(watch('type') === Type.Single ? 4 : 5);
  }, [watch('type')]);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') setSliderValue(newValue);
  };

  const onCreateLabel = () => {
    setIsCreatingLabel(true);
    const newLabel = getValues('label');
    createLabel(newLabel)
      .then(() => {
        getLabels().then((res) => setLabels(res));
        dispatch(openSnackbar({ severity: 'success', message: '標籤新增成功' }));
      })
      .catch(() => {
        dispatch(openSnackbar({ severity: 'error', message: '標籤新增失敗' }));
      })
      .finally(() => {
        setIsCreatingLabel(false);
      });
  };

  const onSubmit = (data: QuestionForm) => {
    let hasError = false;
    if (data.label === '') {
      setError('label', { message: 'required' });
      hasError = true;
    }
    if (!labels?.map((v) => v.label).includes(data.label)) {
      dispatch(openSnackbar({ severity: 'error', message: '請先新增標籤' }));
      hasError = true;
    }
    if (data.type === ('' as Type)) {
      setError('type', { message: 'required' });
      hasError = true;
    }
    if (data.question === '') {
      setError('question', { message: 'required' });
      hasError = true;
    }
    if (data.type !== Type.Essay && data.answer === '') {
      setError('answer', { message: 'required' });
      hasError = true;
    }
    if (data.type === Type.Multiple && !data.answer.split(',').includes('true')) {
      setError('answer', { message: 'required' });
      hasError = true;
    }
    if (hasError) return;

    setIsCreatingQuestion(true);
    createQuestion({
      labelId: labels!.find((v) => v.label === data.label)!.id,
      type: data.type,
      question: data.question,
      answer:
        data.type === Type.Essay
          ? undefined
          : data.type === Type.Single
          ? `${data.answer}/${sliderValue}`
          : data.answer,
    })
      .then(() => {
        dispatch(openSnackbar({ severity: 'success', message: '題目新增成功' }));
      })
      .catch(() => {
        dispatch(openSnackbar({ severity: 'error', message: '題目新增失敗' }));
      })
      .finally(() => {
        setIsCreatingQuestion(false);
      });
  };

  if (labels === undefined) return <Loader />;

  return (
    <form className={style.self} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.label}>
        <Autocomplete
          className={style.autocomplete}
          onChange={(_event: unknown, newValue: string | null) => {
            setValue('label', newValue ?? '');
            clearErrors('label');
          }}
          disablePortal
          freeSolo
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;

            const isExisting = options.some((option) => inputValue === option);
            if (inputValue !== '' && !isExisting) filtered.push(inputValue);

            return filtered;
          }}
          options={labels.map((v) => v.label)}
          renderInput={(params) => (
            <TextField {...params} size="small" label="標籤" error={errors.label !== undefined} />
          )}
        />
        {watch('label') && !labels.map((v) => v.label).includes(getValues('label')) && (
          <Button
            type="button"
            onClick={onCreateLabel}
            variant="outlined"
            disabled={isCreatingLabel}
          >
            新增此標籤
          </Button>
        )}
      </div>
      <FormSelect
        control={control}
        name="type"
        label="題型"
        size="small"
        error={errors.type !== undefined}
        options={[
          { value: Type.TrueFalse, label: '是非題' },
          { value: Type.Single, label: '單選題' },
          { value: Type.Multiple, label: '多選題' },
          { value: Type.FillInBlank, label: '填充題' },
          { value: Type.Essay, label: '問答題' },
        ]}
      />
      <FormInput
        control={control}
        name="question"
        multiline
        minRows={4}
        label="題目"
        error={errors.question !== undefined}
      />
      <h3>題目預覽</h3>
      <Card variant="outlined" className={style.preview}>
        <MathJax>
          <div>{watch('question') && getValues('question')}</div>
        </MathJax>
      </Card>
      {watch('type') !== Type.Essay && (
        <h3 className={classNames({ [style.answer]: errors.answer !== undefined })}>答案</h3>
      )}
      {watch('type') === Type.TrueFalse && (
        <FormRadio
          control={control}
          name="answer"
          items={[
            { value: 'true', label: '是' },
            { value: 'false', label: '否' },
          ]}
        />
      )}
      {(watch('type') === Type.Single || watch('type') === Type.Multiple) && (
        <Slider
          defaultValue={sliderValue}
          value={sliderValue}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={2}
          max={10}
        />
      )}
      {watch('type') === Type.Single && (
        <FormRadio
          control={control}
          name="answer"
          items={[...Array(sliderValue).keys()].map((v) => ({
            value: String(v + 1),
            label: String(v + 1),
          }))}
        />
      )}
      {watch('type') === Type.Multiple && (
        <FormCheckboxGroup control={control} name="answer" options={multipleOptions} />
      )}
      {watch('type') === Type.FillInBlank && (
        <FormInput control={control} name="answer" error={errors.answer !== undefined} />
      )}
      <div>
        <Button type="submit" variant="contained" disabled={isCreatingQuestion}>
          確認送出
        </Button>
      </div>
    </form>
  );
};

export default NewQuestion;
