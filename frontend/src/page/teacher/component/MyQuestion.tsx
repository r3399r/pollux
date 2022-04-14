import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Page } from 'src/constant/Page';

const MyQuestion = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button variant="outlined" onClick={() => navigate(Page.NewQuestion)}>
        新增題目
      </Button>
      <div>table here</div>
    </>
  );
};

export default MyQuestion;
