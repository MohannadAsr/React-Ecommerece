import AppLoading from '@components/AppLoading.tsx';
import MuiLocalizationLayout from '@components/layouts/MuiLocalizationLayout.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import i18n from './plugins/i18n.ts'; // Import your i18n instance
import store from './store/store.ts';
import './styles/global.scss';

// import App from './App.tsx';
const App = React.lazy(() => import('./App.tsx'));

export const theme = createTheme({
  direction: 'ltr',
  palette: {
    mode: 'light',

    primary: {
      main: '#FA671C',
      light: '#FFEDE4',
    },
    secondary: {
      main: '#F67B25',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MuiLocalizationLayout>
      <React.Suspense fallback={<AppLoading />}>
        <ThemeProvider theme={theme}>
          {/* <GoogleOAuthProvider clientId={GOOGLE_API.clientId}> */}
          <I18nextProvider i18n={i18n}>
            <Provider store={store}>
              <App />
            </Provider>
          </I18nextProvider>
          {/* </GoogleOAuthProvider> */}
        </ThemeProvider>
      </React.Suspense>
    </MuiLocalizationLayout>
  </BrowserRouter>
);
