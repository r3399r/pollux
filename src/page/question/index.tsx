import { Drawer } from '@mui/material';
import { MathJax } from 'better-react-mathjax';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from 'src/component/Menu';
import Body from 'src/component/typography/Body';
import H2 from 'src/component/typography/H2';
import IcMenu from 'src/image/ic-menu.svg';
import { Question, SavedQuestion, Type, TypeName } from 'src/model/Common';
import { handleQuestion } from 'src/service/QuestionService';
import History from './History';
import QuestionForm from './QuestionForm';

const QuestionPage = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: Type }>();
  const [current, setCurrent] = useState<Question>();
  const [history, setHistory] = useState<SavedQuestion[]>([]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openHistory, setOpenHistory] = useState<boolean>(false);

  const initQuestion = (next: boolean) => {
    if (!type) return;
    try {
      const { history, ...res } = handleQuestion(type, next);
      setCurrent(res);
      setHistory(history);
    } catch (e) {
      navigate('/add10');
    }
  };

  useEffect(() => {
    initQuestion(false);
  }, [type]);

  return (
    <>
      <MathJax dynamic>
        <div className="flex justify-between items-center mt-0 md:mt-[30px] pb-7">
          <div className="flex items-center">
            <H2>{type && TypeName[type]}</H2>
            <img
              src={IcMenu}
              className="md:hidden cursor-pointer"
              onClick={() => setOpenMenu(true)}
            />
          </div>
          <Body className="md:hidden cursor-pointer" onClick={() => setOpenHistory(true)}>
            歷史題庫
          </Body>
        </div>
        <div className="flex">
          <div className="hidden md:block w-1/2 h-[calc(100vh-140px-92px)] md:h-[calc(100vh-170px-92px)] overflow-y-auto">
            <History history={history} />
          </div>
          <div className="w-full md:w-1/2 h-[calc(100vh-140px-92px)] bg-white md:h-[calc(100vh-170px-92px)] overflow-y-auto">
            <QuestionForm initQuestion={initQuestion} current={current} />
          </div>
        </div>
      </MathJax>
      <Drawer anchor="left" open={openMenu} onClose={() => setOpenMenu(false)}>
        <Menu isDrawer onClick={() => setOpenMenu(false)} />
      </Drawer>
      <Drawer anchor="right" open={openHistory} onClose={() => setOpenHistory(false)}>
        <MathJax>
          <History history={history} />
        </MathJax>
      </Drawer>
    </>
  );
};

export default QuestionPage;
