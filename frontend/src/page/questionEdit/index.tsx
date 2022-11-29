import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { SelectOption } from '@mui/base';
import randomColor from 'randomcolor';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'src/celestial-ui/component/Button';
import Input from 'src/celestial-ui/component/Input';
import MultiSelect from 'src/celestial-ui/component/MultiSelect';
import Switch from 'src/celestial-ui/component/Switch';
import H1 from 'src/celestial-ui/component/typography/H1';
import H3 from 'src/celestial-ui/component/typography/H3';
import Body from 'src/component/Body';
import Option from 'src/component/Option';
import { Page } from 'src/constant/Page';
import { RootState } from 'src/redux/store';
import { openSnackbar } from 'src/redux/uiSlice';
import { createQuestion, loadTagList } from 'src/service/questionService';
import ModalPreview from './ModalPreview';

const QuestionEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [applyMathJax, setApplyMathJax] = useState<boolean>(false);
  const { tagList } = useSelector((rootState: RootState) => rootState.tag);
  const [content, setContent] = useState<string>();
  const [hasAnswer, setHasAnswer] = useState<boolean>(true);
  const [answer, setAnswer] = useState<string>();
  const [hasSolution, setHasSolution] = useState<boolean>(false);
  const [solution, setSolution] = useState<string>();
  const [tagId, setTagId] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState<boolean>(false);

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
      isMathjax: applyMathJax,
      tagId,
    })
      .then(() => navigate(Page.Question))
      .catch((err) => dispatch(openSnackbar(err.response.data.message)));
  };

  if (tagList === null) return <></>;

  return (
    <>
      <H1 className="mb-4">增修題目</H1>
      <div className="flex items-center mt-4 gap-4">
        <Body size="l" bold>
          套用 MathJax
        </Body>
        <Switch onChange={(e) => setApplyMathJax(e.target.checked)} />
      </div>
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
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
      <div className="flex items-center mt-4 gap-4">
        <H3>答案</H3>
        <Switch onChange={(e) => setHasAnswer(e.target.checked)} defaultChecked />
      </div>
      <Input
        onChange={(event) => setAnswer(event.target.value)}
        disabled={!hasAnswer}
        placeholder="請輸入答案 (僅一行)"
      />
      <div className="flex items-center my-4 gap-4">
        <H3>詳解</H3>
        <Switch onChange={(e) => setHasSolution(e.target.checked)} />
      </div>
      {hasSolution && (
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            setSolution(data);
          }}
        />
      )}
      <div className="flex mt-4 justify-end gap-4">
        <Button
          type="button"
          appearance="default"
          disabled={!clickable}
          onClick={() => setIsPreview(true)}
        >
          預覽
        </Button>
        <Button type="button" onClick={onSubmit} disabled={!clickable}>
          送出
        </Button>
      </div>
      <ModalPreview
        open={isPreview}
        handleClose={() => setIsPreview(false)}
        applyMathJax={applyMathJax}
        content={content ?? ''}
        answer={hasAnswer ? answer : undefined}
        solution={hasSolution ? solution : undefined}
      />
    </>
  );
};

export default QuestionEdit;
