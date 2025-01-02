import axios from 'axios';
import {useQuery} from 'react-query';
import auth from '@react-native-firebase/auth';

const useQueryAPI = (
  url,
  customConfig = {},
  whenSuccess,
  whenError,
  polling = false, // new polling parameter (defaults to false)
  pollingInterval = 5000, // default polling interval in milliseconds (5 seconds)
) => {
  const defaultConfig = {
    method: 'get', // or 'post', 'put', 'delete', etc., depending on your API
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': userToken ? `Bearer ${userToken}` : '', // Include user token if available
      // Add any other common headers here
    },
  };

  const config = {
    ...defaultConfig,
    ...customConfig,
  };

  const fetchData = async () => {
    try {
      const idToken = await auth().currentUser.getIdToken();
      const response = await axios.request({
        url: url,
        method: config.method, // use method from config
        headers: {
          'Content-Type': 'application/json',
          Authorization: idToken ? `Bearer ${idToken}` : '',
        },
      });

      return response.data;
    } catch (error) {
      console.log('error -->', error);
      const message = error?.response?.data?.message || error?.message;
      throw new Error(message);
    }
  };

  return useQuery(url, fetchData, {
    enabled: false,
    refetchInterval: polling ? pollingInterval : false, // Enables polling if 'polling' is true
    onSuccess: responseData => {
      whenSuccess(responseData);
    },
    onError: err => {
      whenError(err);
    },
  });
};

export default useQueryAPI;
