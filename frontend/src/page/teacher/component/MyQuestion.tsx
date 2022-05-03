import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Label, Question } from '@y-celestial/pollux-service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from 'src/constant/Page';
import { getLabels, getQuestions } from 'src/service/questionService';
import style from './MyQuestion.module.scss';
import MyQuestionRow from './MyQuestionRow';

const MyQuestion = () => {
  const navigate = useNavigate();
  const [labels, setLabels] = useState<Label[]>();
  const [questions, setQuestions] = useState<Question[]>();
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getLabels().then((res) => setLabels(res));
    getQuestions().then((res) => setQuestions(res));
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => navigate(Page.NewQuestion)}
        className={style.button}
      >
        新增題目
      </Button>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">標籤</InputLabel>
        <Select
          value={filter}
          labelId="demo-simple-select-label"
          label="標籤"
          onChange={handleChange}
        >
          {labels?.map((v) => (
            <MenuItem key={v.id} value={v.id}>
              {v.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer>
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
                .filter((v) => (filter === undefined ? true : v.labelId === filter))
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
    </>
  );
};

export default MyQuestion;
