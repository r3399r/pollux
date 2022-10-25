import { useNavigate } from 'react-router-dom';
import Button from 'src/component/celestial-ui/Button';
import H1 from 'src/component/celestial-ui/typography/H1';
import { Page } from 'src/constant/Page';

const Question = () => {
  const navigate = useNavigate();

  return (
    <>
      <H1>題目清單</H1>
      <Button className="my-3" onClick={() => navigate(`${Page.Question}/edit`)}>
        新增題目
      </Button>
    </>
  );
};

export default Question;
