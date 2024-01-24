import ToastContainer from '@components/Toast/ToastContainer';
import { LinearProgress } from '@mui/material';
import { AppDispatch, RootState } from '@store/store';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import useLang from './hooks/useLang';
import { switchMode } from './reducers/AppSlice';

function App() {
  const { t, i18n } = useTranslation();
  const { changeHtml } = useLang();
  const dispatch = useDispatch<AppDispatch>();
  const { menuStatus } = useSelector((state: RootState) => state.App);
  const handleBodyOverflow = React.useCallback(() => {
    document.body.style.overflow = menuStatus ? 'hidden' : 'auto';
  }, [menuStatus]);
  const { GetUserData, isLoggedIn } = useAuth();

  React.useEffect(() => {
    handleBodyOverflow();
  }, [handleBodyOverflow]);

  React.useEffect(() => {
    // Check for any existed theme mode and update it
    const siteMode = localStorage.getItem('site-mode');
    dispatch(switchMode(siteMode ? JSON.parse(siteMode) : 'dark'));

    // Chnage HTML dir onLaod
    changeHtml(i18n.language);
  }, [isLoggedIn()]);

  return (
    <>
      <div className=" relative  ">
        <LinearProgress
          color="primary"
          id="request-progress"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 99999999,
            visibility: 'hidden',
          }}
        />
        <ToastContainer />
        {menuStatus && <></>}
        <Routes>
          <Route path="/" element={<>ewewew</>} />
        </Routes>
      </div>
    </>
  );
}
{
  /*  */
}

export default App;
