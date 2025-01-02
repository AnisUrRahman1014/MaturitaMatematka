// This file will be used for similar type of APIs. For APIs which require different setup, please make a new file and call API there

import axios from 'axios';
import { useMutation } from 'react-query';
import auth from '@react-native-firebase/auth';

const useMutationAPI = (url, customConfig = {}, whenSuccess, whenError) => {

  const defaultConfig = {
    method: 'post', // or 'get', 'put', 'delete', etc.
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': userToken ? `Bearer ${userToken}` : '',
      // Add any other common headers here
    },
  };

  const config = {
    ...defaultConfig,
    ...customConfig,
  };

  const fetchData = async body => {
    try {
      const idToken = await auth().currentUser.getIdToken();
      // console.log('idToken ==>>', idToken);
      const response = await axios.request({
        url,
        data: body,
        method: 'post', // or 'get', 'put', 'delete', etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken ? `Bearer ${idToken}` : '',
        },
      });

      return response.data;
    } catch (error) {
      // Handle network errors, failed requests, etc.
      console.log(Object.keys(error))
      console.log('error ===>>', JSON.stringify(error.response, null, 2))
      const message =
        error?.response?.data?.message ||
        error?.message
      throw new Error(message);
    }
  };

  return useMutation(fetchData, {
    onSuccess: (responseData) => {
      // console.log('Data sent successfully:', responseData);
      whenSuccess(responseData)
    },
    onError: (err) => {
      // console.log('Error sending data:', err);
      whenError(err)
    }
  });
};

export default useMutationAPI;