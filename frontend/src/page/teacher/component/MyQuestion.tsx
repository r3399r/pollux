import {
  Button,
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
import { getLabels, getQuestions, typeLocale } from 'src/service/questionService';

const MyQuestion = () => {
  const navigate = useNavigate();
  const [labels, setLabels] = useState<Label[]>();
  const [questions, setQuestions] = useState<Question[]>();

  useEffect(() => {
    getLabels().then((res) => setLabels(res));
    getQuestions().then((res) => setQuestions(res));
  }, []);

  return (
    <>
      <Button variant="outlined" onClick={() => navigate(Page.NewQuestion)}>
        新增題目
      </Button>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>標籤</TableCell>
              <TableCell>題型</TableCell>
              <TableCell>預覽</TableCell>
              <TableCell>答案</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {labels &&
              questions &&
              questions.map((v, i) => (
                <TableRow key={v.id}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{labels.find((o) => o.id === v.labelId)?.label}</TableCell>
                  <TableCell>{typeLocale(v.type)}</TableCell>
                  <TableCell>{v.question}</TableCell>
                  <TableCell>{v.answer}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyQuestion;
