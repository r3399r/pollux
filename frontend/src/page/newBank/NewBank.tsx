import { Button, Card, CardActionArea, Divider, MenuItem, TextField } from '@mui/material';
import { Label, Question } from '@y-celestial/pollux-service';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from 'src/component/Loader';
import Preview from 'src/component/Preview';
import QuestionPreview from 'src/component/QuestionPreview';
import { Page } from 'src/constant/Page';
import { openSnackbar } from 'src/redux/uiSlice';
import { createBank } from 'src/service/bankService';
import { getLabels, getQuestions, parseAnswer, typeLocale } from 'src/service/questionService';
import style from './NewBank.module.scss';

const NewBank = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bankName, setBankName] = useState<string>('');
  const [labels, setLabels] = useState<Label[]>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [bankQuestions, setBankQuestions] = useState<Question[]>([]);

  useEffect(() => {
    getLabels().then((res) => {
      setLabels(res);
    });
  }, []);

  useEffect(() => {
    if (filter === '') return;
    getQuestions(filter).then((res) => setQuestions(res));
  }, [filter]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const onCardClick = (question: Question) => () => {
    if (bankQuestions.find((v) => v.id === question.id))
      dispatch(openSnackbar({ severity: 'error', message: '此題目已在題庫裡' }));
    else setBankQuestions([...bankQuestions, question]);
  };

  const onBankCardClick = (id: string) => () => {
    setBankQuestions([...bankQuestions].filter((v) => v.id !== id));
  };

  const onSubmit = () => {
    if (bankName === '' || bankQuestions.length === 0) return;
    createBank({ name: bankName, questionId: bankQuestions.map((v) => v.id) })
      .then(() => {
        navigate(`${Page.Teacher}?t=2`);
      })
      .catch(() => {
        dispatch(openSnackbar({ severity: 'error', message: '題庫新建失敗' }));
      });
  };

  if (labels === undefined) return <Loader />;

  return (
    <div className={style.self}>
      <div>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          回上一頁
        </Button>
      </div>
      <h1>建立新題庫</h1>
      <TextField
        size="small"
        label="題庫名稱"
        value={bankName}
        onChange={(v) => setBankName(v.target.value)}
      />
      {bankQuestions.map((v, i) => (
        <Card key={v.id} variant="outlined">
          <CardActionArea onClick={onBankCardClick(v.id)}>
            <div className={style.card}>
              <div className={style.head}>
                <div className={style.item}>No. {i + 1}</div>
                <div className={style.item}>{typeLocale(v.type)}</div>
                <div className={style.answer}>答: {parseAnswer(v)}</div>
              </div>
              <div className={style.preview}>
                <Preview applyMathjax={true}>
                  <QuestionPreview blocks={JSON.parse(v.question)} />
                </Preview>
              </div>
            </div>
          </CardActionArea>
        </Card>
      ))}
      <div>
        <Button variant="contained" onClick={onSubmit}>
          儲存
        </Button>
      </div>
      <Divider />
      <h2>題目清單</h2>
      <TextField
        value={filter}
        label="標籤"
        size="small"
        select
        onChange={handleChange}
        helperText={'請選擇標籤，並點選要列入題庫的題目'}
      >
        {labels.map((v) => (
          <MenuItem key={v.id} value={v.id}>
            {v.label}
          </MenuItem>
        ))}
      </TextField>
      {questions?.map((v, i) => (
        <Card key={v.id} variant="outlined">
          <CardActionArea onClick={onCardClick(v)}>
            <div className={style.card}>
              <div className={style.head}>
                <div className={style.item}>No. {i + 1}</div>
                <div className={style.item}>{typeLocale(v.type)}</div>
                <div className={style.answer}>答: {parseAnswer(v)}</div>
              </div>
              <div className={style.preview}>
                <Preview applyMathjax={true}>
                  <QuestionPreview blocks={JSON.parse(v.question)} />
                </Preview>
              </div>
            </div>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default NewBank;
