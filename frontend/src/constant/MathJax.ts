// http://docs.mathjax.org/en/latest/web/configuration.html
export const MathJaxConfig = {
  tex: {
    inlineMath: [['$', '$']],
    macros: {
      vector: ['\\overset{\\small\\rightharpoonup}{#1}', 1],
      xvector: ['\\overset{\\LARGE\\rightharpoonup}{#1}', 1],
      parallel: ['\\mathrel{/\\mkern-5mu/}', 0],
      nparallel: ['\\bcancel{\\mathrel{/\\mkern-5mu/}}', 0],
      arc: ['\\overset{\\huge\\frown}{#1}', 1],
      du: ['^\\circ', 0],
      arg: ['\\operatorname{Arg}', 0],
    },
  },
};
