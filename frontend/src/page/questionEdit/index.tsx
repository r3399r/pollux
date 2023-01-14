import { SelectOption } from '@mui/base';
import randomColor from 'randomcolor';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'src/celestial-ui/component/Button';
import MultiSelect from 'src/celestial-ui/component/MultiSelect';
import Switch from 'src/celestial-ui/component/Switch';
import H1 from 'src/celestial-ui/component/typography/H1';
import H3 from 'src/celestial-ui/component/typography/H3';
import Editor from 'src/component/Editor';
import Option from 'src/component/Option';
import { Page } from 'src/constant/Page';
import { RootState } from 'src/redux/store';
import { openSnackbar } from 'src/redux/uiSlice';
import { createQuestion, loadTagList } from 'src/service/questionService';

const QuestionEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tagList } = useSelector((rootState: RootState) => rootState.tag);
  const [content, setContent] = useState<string>();
  const [hasAnswer, setHasAnswer] = useState<boolean>(true);
  const [answer, setAnswer] = useState<string>();
  const [hasSolution, setHasSolution] = useState<boolean>(false);
  const [solution, setSolution] = useState<string>();
  const [tagId, setTagId] = useState<string[]>([]);

  const clickable =
    !!content &&
    (!hasAnswer || (hasAnswer && !!answer)) &&
    (!hasSolution || (hasSolution && !!solution));

  useEffect(() => {
    loadTagList().catch((err) => dispatch(openSnackbar(err.response.data.message)));
  }, []);

  const renderValue = (options: SelectOption<string>[]) => (
    <div className="flex gap-2 flex-wrap">{options.map((v) => v.label)}</div>
  );

  const onSubmit = () => {
    if (!clickable) return;
    createQuestion({
      content,
      answer: hasAnswer ? answer : undefined,
      solution: hasSolution ? solution : undefined,
      tagId,
    })
      .then(() => navigate(Page.Question))
      .catch((err) => dispatch(openSnackbar(err.response.data.message)));
  };

  if (tagList === null) return <></>;

  return (
    <>
      <H1 className="mb-4">增修題目</H1>
      <H3 className="mb-4">標籤</H3>
      <MultiSelect renderValue={renderValue} onChange={(event, value) => setTagId(value)}>
        {tagList.map((v) => (
          <Option key={v.id} value={v.id}>
            <div
              key={v.id}
              className="px-2 rounded-2xl text-white w-fit"
              style={{ background: randomColor({ seed: v.id, luminosity: 'dark' }) }}
            >
              {v.name}
            </div>
          </Option>
        ))}
      </MultiSelect>
      <H3 className="my-4">題目內容</H3>
      <Editor onChange={(v) => setContent(v)} />
      <div className="flex items-center my-4 gap-4">
        <H3>答案</H3>
        <Switch onChange={(e) => setHasAnswer(e.target.checked)} defaultChecked />
      </div>
      {hasAnswer && <Editor onChange={(v) => setAnswer(v)} />}
      <div className="flex items-center my-4 gap-4">
        <H3>詳解</H3>
        <Switch onChange={(e) => setHasSolution(e.target.checked)} />
      </div>
      {hasSolution && <Editor onChange={(v) => setSolution(v)} />}
      <div className="flex mt-4 justify-end gap-4">
        <Button type="button" onClick={onSubmit} disabled={!clickable}>
          送出
        </Button>
      </div>
    </>
  );
};

export default QuestionEdit;
