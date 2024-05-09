import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useLastVisitedUrl = () => {
  const history = useHistory();

  useEffect(() => {
    const lastVisitedUrl = localStorage.getItem('lastVisitedUrl');
    if (lastVisitedUrl) {
      history.push(lastVisitedUrl);
    }
  }, [history]);

  useEffect(() => {
    const unlisten = history.listen(location => {
      localStorage.setItem('lastVisitedUrl', location.pathname);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return history;
};

export default useLastVisitedUrl;