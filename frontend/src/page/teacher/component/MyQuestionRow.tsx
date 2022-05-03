import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import { Question } from '@y-celestial/pollux-service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Preview from 'src/component/Preview';
import QuestionPreview from 'src/component/QuestionPreview';
import { Page } from 'src/constant/Page';
import { parseAnswer, typeLocale } from 'src/service/questionService';
import style from './MyQuestionRow.module.scss';

type RowProps = {
  question: Question;
  index: number;
  label?: string;
};

const MyQuestionRow = ({ question, index, label }: RowProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <TableRow className={style.main}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell>{label}</TableCell>
        <TableCell>{typeLocale(question.type)}</TableCell>
        <TableCell>{parseAnswer(question)}</TableCell>
        <TableCell className={style.config}>
          {open && (
            <IconButton
              size="small"
              onClick={() => navigate(Page.NewQuestion, { state: question })}
            >
              <EditIcon />
            </IconButton>
          )}
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow className={style.collapse}>
        <TableCell colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Preview applyMathjax={true}>
              <QuestionPreview className={style.preview} blocks={JSON.parse(question.question)} />
            </Preview>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default MyQuestionRow;
