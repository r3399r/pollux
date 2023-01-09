import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'src/celestial-ui/component/Button';
import H1 from 'src/celestial-ui/component/typography/H1';
import { Page } from 'src/constant/Page';
import { RootState } from 'src/redux/store';
import { openSnackbar } from 'src/redux/uiSlice';
import { loadQuestionList } from 'src/service/questionService';
import QuestionBlock from './QuestionBlock';

const Question = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questionList } = useSelector((rootState: RootState) => rootState.question);

  useEffect(() => {
    loadQuestionList().catch((err) => dispatch(openSnackbar(err.response.data.message)));
  }, []);

  return (
    <>
      <H1>題目清單</H1>
      <Button className="my-3" onClick={() => navigate(`${Page.Question}/edit`)}>
        新增題目
      </Button>
      {questionList?.map((v) => (
        <QuestionBlock key={v.id} question={v} />
      ))}
    </>
  );
};

export default Question;
