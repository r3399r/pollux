import {
  Button,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Label, Question } from '@y-celestial/pollux-service';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from 'src/constant/Page';
import { getLabels, getQuestions } from 'src/service/questionService';
import style from './MyQuestion.module.scss';
import MyQuestionRow from './MyQuestionRow';

const MyQuestion = () => {
  const navigate = useNavigate();
  const [labels, setLabels] = useState<Label[]>([]);
  const [questions, setQuestions] = useState<Question[]>();
  const [filter, setFilter] = useState<string>('');

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

  return (
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>標籤</TableCell>
              <TableCell>題型</TableCell>
              <TableCell>答案</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {labels &&
              questions &&
              questions
                .filter((v) => v.labelId === filter)
                .map((v, i) => (
                  <MyQuestionRow
                    key={v.id}
                    question={v}
                    index={i}
                    label={labels.find((o) => o.id === v.labelId)?.label}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyQuestion;
