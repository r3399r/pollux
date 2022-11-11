import { MathJaxContext } from 'better-react-mathjax';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MathJaxProvider = ({ children }: Props) => (
  <MathJaxContext
    config={{
      loader: { load: ['[tex]/mathtools', '[tex]/cancel'] },
      tex: {
        inlineMath: [['$', '$']],
        packages: { '[+]': ['mathtools', 'physics', 'cancel'] },
        macros: {
          vector: ['\\overset{\\small\\rightharpoonup}{#1}', 1],
          xvector: ['\\overset{\\LARGE\\rightharpoonup}{#1}', 1],
          parallel: ['\\mathrel{/\\mkern-5mu/}', 0],
          nparallel: ['\\bcancel{\\mathrel{/\\mkern-5mu/}}', 0],
          arc: ['\\overset{\\huge\\frown}{#1}', 1],
          du: ['^\\circ', 0],
          arg: ['\\operatorname{Arg}', 0],
          textcirc: ['\\enclose{circle}{\\kern .06em \\text{#1}\\kern .06em}', 1],
          dv: ['\\dfrac{\\text{d}{#1}}{\\text{d}{#2}}', 2],
          ddv: ['\\dfrac{\\text{d}}{\\text{d}{#1}}', 1],
        },
      },
    }}
  >
    {children}
  </MathJaxContext>
);

export default MathJaxProvider;
