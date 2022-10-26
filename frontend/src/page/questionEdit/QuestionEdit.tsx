import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useState } from 'react';
import Input from 'src/component/celestial-ui/Input';
import Switch from 'src/component/celestial-ui/Switch';
import H1 from 'src/component/celestial-ui/typography/H1';
import H3 from 'src/component/celestial-ui/typography/H3';

const QuestionEdit = () => {
  const [content, setContent] = useState<string>();
  const [hasAnswer, setHasAnswer] = useState<boolean>(true);
  const [answer, setAnswer] = useState<string>();
  const [hasSolution, setHasSolution] = useState<boolean>(false);
  const [solution, setSolution] = useState<string>();
  console.log(content, answer, solution);

  return (
    <>
      <H1 className="mb-4">增修題目</H1>
      <H3 className="mb-4">標籤</H3>
      <H3 className="mb-4">題目內容</H3>
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
    </>
  );
};

export default QuestionEdit;
