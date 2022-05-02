import { MathJax } from 'better-react-mathjax';
import { ReactNode } from 'react';

type PreviewProps = {
  children: ReactNode;
  applyMathjax: boolean;
};

const Preview = ({ applyMathjax, children }: PreviewProps) =>
  applyMathjax ? <MathJax>{children}</MathJax> : <div>{children}</div>;

export default Preview;
