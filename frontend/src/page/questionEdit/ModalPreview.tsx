import Body from 'src/component/Body';
import Modal from 'src/component/celestial-ui/Modal';
import H2 from 'src/component/celestial-ui/typography/H2';

type Props = {
  open: boolean;
  handleClose: () => void;
  applyMathJax: boolean;
  content: string;
  answer?: string;
  solution?: string;
};

const ModalPreview = ({ open, handleClose, applyMathJax, content, answer, solution }: Props) => (
  <Modal open={open} handleClose={handleClose}>
    <>
      <H2>題目內容</H2>
      <Body mathJax={applyMathJax} dangerouslySetInnerHTML={{ __html: content }} />
      {answer && (
        <div>
          <H2>答案</H2>
          <Body mathJax={applyMathJax} dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      )}
      {solution && (
        <div>
          <H2>詳解</H2>
          <Body mathJax={applyMathJax} dangerouslySetInnerHTML={{ __html: solution }} />
        </div>
      )}
    </>
  </Modal>
);

export default ModalPreview;
