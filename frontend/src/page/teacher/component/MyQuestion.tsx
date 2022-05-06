import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import { Label, Question } from '@y-celestial/pollux-service';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Preview from 'src/component/Preview';
import QuestionPreview from 'src/component/QuestionPreview';
import { Page } from 'src/constant/Page';
import { openSnackbar, showLoading } from 'src/redux/uiSlice';
import {
  deleteQuestion,
  getLabels,
  getQuestions,
  parseAnswer,
  typeLocale,
} from 'src/service/questionService';
import style from './MyQuestion.module.scss';

const MyQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [labels, setLabels] = useState<Label[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [deletedId, setDeletedId] = useState<string>();

  useEffect(() => {
    getLabels().then((res) => setLabels(res));
  }, []);

  useEffect(() => {
    if (filter === '') return;
    getQuestions(filter).then((res) => setQuestions(res));
  }, [filter]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleOpen = (id: string) => () => {
    setDeletedId(id);
  };

  const handleClose = () => {
    setDeletedId(undefined);
  };

  const onDelete = () => {
    if (deletedId === undefined) return;
    setDeletedId(undefined);
    dispatch(showLoading(true));
    deleteQuestion(deletedId)
      .then(() => {
        dispatch(openSnackbar({ severity: 'success', message: '刪除成功' }));
        setQuestions(questions.filter((v) => v.id !== deletedId));
      })
      .catch(() => {
        dispatch(openSnackbar({ severity: 'error', message: '刪除失敗' }));
      })
      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  return (
    <>
      <div className={style.self}>
        <Button variant="contained" onClick={() => navigate(Page.NewQuestion)}>
          新增題目
        </Button>
        <TextField
          value={filter}
          label="標籤"
          size="small"
          select
          onChange={handleChange}
          helperText={'請選擇標籤'}
        >
          {labels.map((v) => (
            <MenuItem key={v.id} value={v.id}>
              {v.label}
            </MenuItem>
          ))}
        </TextField>
        {questions?.map((v, i) => (
          <Card key={v.id} className={style.card} variant="outlined">
            <div className={style.head}>
              <div className={style.item}>No. {i + 1}</div>
              <div className={style.item}>{typeLocale(v.type)}</div>
              <div className={style.answer}>答: {parseAnswer(v)}</div>
              <div className={style.icon}>
                <IconButton size="small" onClick={() => navigate(Page.NewQuestion, { state: v })}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={handleOpen(v.id)}>
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            </div>
            <div className={style.preview}>
              <Preview applyMathjax={true}>
                <QuestionPreview blocks={JSON.parse(v.question)} />
              </Preview>
            </div>
          </Card>
        ))}
      </div>
      <Dialog open={deletedId !== undefined} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>確認要刪除此題目，刪除後無法用任何方法回復。</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={onDelete} autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyQuestion;
