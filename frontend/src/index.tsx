import { MathJaxContext } from 'better-react-mathjax';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import App from './App';
import { MathJaxConfig } from './constant/MathJax';
import ThemeProvider from './context/themer';
import { configStore } from './redux/store';
import reportWebVitals from './reportWebVitals';
import './style/index.scss';

const { store, persistor } = configStore();
const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MathJaxContext config={MathJaxConfig}>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </MathJaxContext>
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
