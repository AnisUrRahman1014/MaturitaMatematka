import useMutationAPI from './index';

export const mutationHandler = (url, whenSuccess, whenError) => {
  return useMutationAPI(url, {
    // You can customize headers or other configurations specific to this API call
  }, whenSuccess, whenError);
};