import useQueryApi from './index';

const queryHandler = (url, whenSuccess, whenError, polling = false, pollingInterval = 5000) => {
  return useQueryApi(url, {
    // You can customize headers or other configurations specific to this API call
  }, whenSuccess, whenError,polling,          // Pass the polling parameter
  pollingInterval);
};

export default queryHandler;
