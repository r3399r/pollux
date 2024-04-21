import { Drawer } from '@mui/material';
import { MathJax } from 'better-react-mathjax';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from 'src/component/Menu';
import Body from 'src/component/typography/Body';
import H2 from 'src/component/typography/H2';
import IcMenu from 'src/image/ic-menu.svg';
import { QuestionValues, SavedQuestionValues } from 'src/model/Common';
import { topics } from 'src/model/Topics';
import { handleQuestion, removeRecord } from 'src/service/QuestionService';
import History from './History';
import QuestionForm from './QuestionForm';

const QuestionPage = () => {
  const navigate = useNavigate();
  const { stage, topic } = useParams<{ stage: string; topic: string }>();
  const [currentTopic, setCurrentTopic] = useState<string>();
  const [current, setCurrent] = useState<QuestionValues>();
  const [history, setHistory] = useState<SavedQuestionValues[]>([]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openHistory, setOpenHistory] = useState<boolean>(false);

  const title = useMemo(() => topics.find((t) => t.id === topic)?.name, [topic]);

  const initQuestion = (next: boolean, save?: boolean) => {
    if (!topic) return;
    try {
      const { current: c, history: h } = handleQuestion(topic, next, save);
      setCurrent(c);
      setHistory(h);
      setCurrentTopic(topic);
    } catch (e) {
      navigate('/');
    }
  };

  const onRemoveRecord = () => {
    if (!topic) return;
    removeRecord(topic);
    setHistory([]);
  };

  useEffect(() => {
    initQuestion(false);
  }, [topic]);

  if (!title) return <></>;

  return (
    <div className="flex pt-[30px]">
      <div className="hidden md:block h-[calc(100vh-170px)]">
        <Menu />
      </div>
      <div className="flex-1">
        <div className="box-content md:px-10 lg:max-w-[1024px] lg:mx-auto">
          <MathJax dynamic>
            <H2 className="hidden md:block mt-[30px] pb-7">{title}</H2>
            <div className="flex justify-between items-center mt-0 md:mt-[30px] pb-7 md:hidden gap-x-1">
              <div
                className="flex flex-wrap items-center cursor-pointer"
                onClick={() => setOpenMenu(true)}
              >
                <H2>{title}</H2>
                <img src={IcMenu} />
              </div>
              <Body
                className={classNames('cursor-pointer', {
                  'text-orange-700': stage === 'elementary',
                  'text-olive-700': stage === 'junior-high',
                  'text-haze-700': stage === 'senior-high',
                })}
                onClick={() => setOpenHistory(true)}
              >
                觀看答題紀錄
              </Body>
            </div>
            <div className="flex">
              <div className="hidden md:block w-1/2 md:h-[calc(100vh-170px-92px)] overflow-y-auto">
                <History
                  history={currentTopic !== topic ? [] : history}
                  onRemoveRecord={onRemoveRecord}
                />
              </div>
              <div className="w-full md:w-1/2 bg-white md:h-[calc(100vh-170px-92px)] overflow-y-auto rounded-[15px]">
                <QuestionForm
                  initQuestion={initQuestion}
                  current={currentTopic !== topic ? undefined : current}
                />
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
            history={currentTopic !== topic ? [] : history}
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
