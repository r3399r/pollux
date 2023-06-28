import { Drawer } from '@mui/material';
import { MathJax } from 'better-react-mathjax';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from 'src/component/Menu';
import Body from 'src/component/typography/Body';
import H2 from 'src/component/typography/H2';
import IcMenu from 'src/image/ic-menu.svg';
import { CategoryType, Question, SavedQuestion, Type } from 'src/model/Common';
import { handleQuestion, removeRecord } from 'src/service/QuestionService';
import History from './History';
import QuestionForm from './QuestionForm';

const QuestionPage = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: Type }>();
  const [current, setCurrent] = useState<Question>();
  const [history, setHistory] = useState<SavedQuestion[]>([]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openHistory, setOpenHistory] = useState<boolean>(false);

  const title = useMemo(() => {
    let res = '';
    CategoryType.forEach((c) => {
      c.types.forEach((t) => {
        if (t.type === type) res = t.name;
      });
    });

    return res;
  }, [type]);

  const initQuestion = (next: boolean, save?: boolean) => {
    if (!type) return;
    try {
      const { current: c, history: h } = handleQuestion(type, next, save);
      setCurrent(c);
      setHistory(h);
    } catch (e) {
      navigate('/add10');
    }
  };

  const onRemoveRecord = () => {
    if (!type) return;
    removeRecord(type);
    setHistory([]);
  };

  useEffect(() => {
    initQuestion(false);
  }, [type]);

  return (
    <div className="flex pt-[30px]">
      <div className="hidden md:block h-[calc(100vh-140px)] md:h-[calc(100vh-170px)]">
        <Menu />
      </div>
      <div className="flex-1">
        <div className="box-content md:px-10 lg:max-w-[1024px] lg:mx-auto">
          <MathJax dynamic>
            <div className="flex justify-between items-center mt-0 md:mt-[30px] pb-7">
              <div className="flex items-center">
                <H2>{title}</H2>
                <img
                  src={IcMenu}
                  className="md:hidden cursor-pointer"
                  onClick={() => setOpenMenu(true)}
                />
              </div>
              <Body
                className="md:hidden cursor-pointer text-olive-700"
                onClick={() => setOpenHistory(true)}
              >
                答題紀錄
              </Body>
            </div>
            <div className="flex">
              <div className="hidden md:block w-1/2 h-[calc(100vh-140px-92px)] md:h-[calc(100vh-170px-92px)] overflow-y-auto">
                <History history={history} onRemoveRecord={onRemoveRecord} />
              </div>
              <div className="w-full md:w-1/2 h-[calc(100vh-140px-92px)] bg-white md:h-[calc(100vh-170px-92px)] overflow-y-auto">
                <QuestionForm initQuestion={initQuestion} current={current} />
              </div>
            </div>
          </MathJax>
        </div>
      </div>
      <Drawer anchor="left" open={openMenu} onClose={() => setOpenMenu(false)}>
        <Menu isDrawer onCloseDrawer={() => setOpenMenu(false)} />
      </Drawer>
      <Drawer
        anchor="right"
        open={openHistory}
        onClose={() => setOpenHistory(false)}
        classes={{ paper: '!bg-beige-200' }}
      >
        <MathJax className="w-[300px]">
          <History
            history={history}
            isDrawer
            onRemoveRecord={() => {
              setOpenHistory(false);
              onRemoveRecord();
            }}
          />
        </MathJax>
      </Drawer>
    </div>
  );
};

export default QuestionPage;
