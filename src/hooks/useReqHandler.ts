export const useReqHandler = () => {
  const dispatchProgress = (type: boolean) => {
    const progress = document.getElementById('request-progress');
    if (progress) {
      progress.style.visibility = type ? 'visible' : 'hidden';
    }
  };

  return { dispatchProgress };
};
