import { MathJaxContext } from 'better-react-mathjax';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <MathJaxContext
      config={{
        // loader: { load: ['[tex]/mathtools', '[tex]/cancel'] },
        tex: {
          // inlineMath: [['$', '$']],
          // packages: { '[+]': ['mathtools', 'physics', 'cancel'] },
          macros: {
            du: ['^\\circ', 0],
          },
        },
      }}
    >
      <App />
    </MathJaxContext>
  </BrowserRouter>,
);
