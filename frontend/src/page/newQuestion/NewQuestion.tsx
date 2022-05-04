import EditorJS, { OutputBlockData } from '@editorjs/editorjs';
import TableTool from '@editorjs/table';
import {
  Autocomplete,
  Button,
  Card,
  Checkbox,
  createFilterOptions,
  FormControlLabel,
  Slider,
  TextField,
} from '@mui/material';
import { Label, Question, Type } from '@y-celestial/pollux-service';
import classNames from 'classnames';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import FormCheckboxGroup from 'src/component/FormCheckboxGroup';
import FormInput from 'src/component/FormInput';
import FormRadio from 'src/component/FormRadio';
import FormSelect from 'src/component/FormSelect';
import Loader from 'src/component/Loader';
import Preview from 'src/component/Preview';
import QuestionPreview from 'src/component/QuestionPreview';
import { openSnackbar } from 'src/redux/uiSlice';
import {
  createLabel,
  createQuestion,
  getLabels,
  reviseQuestion,
} from 'src/service/questionService';
import style from './NewQuestion.module.scss';

type QuestionForm = {
  label: string;
  type: Type;
  answer: string;
};

const filter = createFilterOptions<string>();
const ReactEditorJS = createReactEditorJS();

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
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [labels, setLabels] = useState<Label[]>();
  const [sliderValue, setSliderValue] = useState<number>(4);
  const [isCreatingLabel, setIsCreatingLabel] = useState<boolean>(false);
  const [isSendingQuestion, setIsSendingQuestion] = useState<boolean>(false);
  const [questionOutput, setQuestionOutput] = useState<OutputBlockData[]>();
  const [applyMathjax, setApplyMathjax] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(true);
  const editorCore = useRef<EditorJS | null>(null);

  const state = location.state as Question | null;

  const multipleOptions = useMemo(
    () => [...Array(sliderValue).keys()].map((v) => String(v + 1)),
    [sliderValue],
  );

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current?.save();
    setQuestionOutput(savedData?.blocks);
  }, []);

  useEffect(() => {
    getLabels().then((res) => {
      setLabels(res);
      setValue('label', res.find((v) => v.id === state?.labelId)?.label ?? '');
    });

    if (state === null) return;
    setInitialized(false);
    setValue('type', state.type);
    setQuestionOutput(JSON.parse(state.question));
    setTimeout(() => {
      setInitialized(true);
      if (state.answer === undefined) return;
      if (state.type === Type.Single) {
        const [ans, opts] = state.answer.split('/');
        setValue('answer', ans);
        setSliderValue(Number(opts));
      } else if (state.type === Type.Multiple) {
        setValue('answer', state.answer);
        setSliderValue(state.answer.split(',').length);
      } else setValue('answer', state.answer);
    }, 500);
  }, []);

  useEffect(() => {
    setValue('answer', '');
    setSliderValue(watch('type') === Type.Single ? 4 : 5);
  }, [watch('type')]);

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setApplyMathjax(event.target.checked);
  };

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
    if (data.label !== '' && !labels?.map((v) => v.label).includes(data.label)) {
      dispatch(openSnackbar({ severity: 'error', message: '請先新增標籤' }));
      hasError = true;
    }
    if (data.type === ('' as Type)) {
      setError('type', { message: 'required' });
      hasError = true;
    }
    if (questionOutput === undefined || questionOutput.length === 0) {
      dispatch(openSnackbar({ severity: 'error', message: '題目不可為空' }));
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

    setIsSendingQuestion(true);
    if (state === null)
      createQuestion({
        labelId: labels!.find((v) => v.label === data.label)!.id,
        type: data.type,
        question: JSON.stringify(questionOutput),
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
          setIsSendingQuestion(false);
        });
    else
      reviseQuestion(state.id, {
        labelId: labels!.find((v) => v.label === data.label)!.id,
        type: data.type,
        question: JSON.stringify(questionOutput),
        answer:
          data.type === Type.Essay
            ? undefined
            : data.type === Type.Single
            ? `${data.answer}/${sliderValue}`
            : data.answer,
      })
        .then(() => {
          dispatch(openSnackbar({ severity: 'success', message: '題目修改成功' }));
        })
        .catch(() => {
          dispatch(openSnackbar({ severity: 'error', message: '題目修改失敗' }));
        })
        .finally(() => {
          setIsSendingQuestion(false);
        });
  };

  if (labels === undefined) return <Loader />;

  return (
    <>
      <Button variant="outlined" onClick={() => navigate(-1)}>
        回上一頁
      </Button>
      <h1>新增題目</h1>
      <form className={style.self} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.label}>
          <Autocomplete
            className={style.autocomplete}
            value={getValues('label')}
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
            clearOnBlur
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
        <h3>題目</h3>
        <Card variant="outlined">
          <ReactEditorJS
            onInitialize={handleInitialize}
            defaultValue={state === null ? undefined : { blocks: JSON.parse(state.question) }}
            onChange={handleSave}
            tools={{ table: TableTool }}
          />
        </Card>
        <div>
          <h3>題目預覽</h3>
          <FormControlLabel
            control={<Checkbox defaultChecked value={applyMathjax} onChange={handleCheckbox} />}
            label="套用 MathJax"
          />
        </div>
        <Card variant="outlined" className={style.preview}>
          <Preview applyMathjax={applyMathjax}>
            <QuestionPreview blocks={questionOutput} />
          </Preview>
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
          <FormCheckboxGroup
            control={control}
            name="answer"
            options={multipleOptions}
            defaultValue={
              state === null || initialized ? undefined : getValues('answer').split(',')
            }
          />
        )}
        {watch('type') === Type.FillInBlank && (
          <FormInput control={control} name="answer" error={errors.answer !== undefined} />
        )}
        <div>
          <Button type="submit" variant="contained" disabled={isSendingQuestion}>
            確認送出
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewQuestion;
