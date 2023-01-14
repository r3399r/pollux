import katex from 'katex';
import SunEditor from 'suneditor-react';
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  image,
  list,
  math,
  table,
  textStyle,
} from 'suneditor/src/plugins';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import 'katex/dist/katex.min.css';

type Props = {
  onChange?: (content: string) => void;
  disable?: boolean;
  hideToolbar?: boolean;
  initContent?: string;
};

const Editor = ({ onChange, disable = false, hideToolbar = false, initContent }: Props) => (
  <SunEditor
    height={'100%'}
    disable={disable}
    hideToolbar={hideToolbar}
    onChange={onChange}
    setContents={initContent}
    setOptions={{
      defaultStyle: 'font-size:16px',
      katex: katex,
      font: [
        'Arial',
        'Comic Sans MS',
        'Courier New',
        'Impact',
        'Georgia',
        'tahoma',
        'Trebuchet MS',
        'Verdana',
        'Lato',
        'Noto Sans TC',
      ],
      plugins: [
        align,
        font,
        fontSize,
        formatBlock,
        fontColor,
        hiliteColor,
        list,
        table,
        textStyle,
        image,
        math,
      ],
      buttonList: [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        [
          'bold',
          'italic',
          'underline',
          'strike',
          'subscript',
          'superscript',
          'fontColor',
          'hiliteColor',
          'align',
          'outdent',
          'indent',
          'list',
          'removeFormat',
          'image',
        ],
        ['table', 'math'],
        ['showBlocks', 'codeView'],
      ],
    }}
  />
);

export default Editor;
