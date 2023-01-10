import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MathJaxProvider from './context/MathJaxContext';
import { configStore } from './redux/store';
import './index.css';
import './ckeditor.css';

const store = configStore();

const root = createRoot(document.getElementById('root') as Element);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MathJaxProvider>
        <App />
      </MathJaxProvider>
    </BrowserRouter>
  </Provider>,
);
