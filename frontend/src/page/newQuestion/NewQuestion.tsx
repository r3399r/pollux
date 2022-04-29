import { Autocomplete, Button, TextField } from '@mui/material';
import { Label, Type } from '@y-celestial/pollux-service';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from 'src/component/FormInput';
import FormRadio from 'src/component/FormRadio';
import FormSelect from 'src/component/FormSelect';
import Loader from 'src/component/Loader';
import { getLabels } from 'src/service/questionService';
import style from './NewQuestion.module.scss';

type QuestionForm = {
  label: string;
  type: Type;
  question: string;
  answer: string;
};

const NewQuestion = () => {
  const [labels, setLabels] = useState<Label[]>();
  const { control, handleSubmit, setValue, watch } = useForm<QuestionForm>();

  useEffect(() => {
    getLabels().then((res) => setLabels(res));
  }, []);

  const onSubmit = (data: QuestionForm) => {
    console.log(data);
  };

  if (labels === undefined) return <Loader />;

  return (
    <form className={style.self} onSubmit={handleSubmit(onSubmit)}>
      <Autocomplete
        onChange={(_event: unknown, newValue: string | null) => {
          setValue('label', newValue ?? '');
        }}
        disablePortal
        options={labels.map((v) => v.label)}
        renderInput={(params) => <TextField {...params} size="small" label="標籤" />}
      />
      <FormSelect
        control={control}
        name="type"
        label="題型"
        size="small"
        options={[
          { value: Type.TrueFalse, label: '是非題' },
          { value: Type.Single, label: '單選題' },
          { value: Type.Multiple, label: '多選題' },
          { value: Type.FillInBlank, label: '填充題' },
          { value: Type.Essay, label: '問答題' },
        ]}
      />
      <FormInput control={control} name="question" multiline minRows={4} label="題目" />
      <FormRadio
        control={control}
        name="answer"
        items={[
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
        ]}
      />
      {watch('type') !== Type.Essay && <FormInput control={control} name="answer" label="答案" />}
      <Button type="submit">aaa</Button>
    </form>
  );
};

export default NewQuestion;
