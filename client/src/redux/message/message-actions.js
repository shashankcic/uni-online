import api from '../../utils/api';

import {
  GET_MESSAGES,
  GET_MESSAGE
} from './message-types';

import { setAlert } from '../alert/alert-actions';

export const sendMessage = (message, id) => async dispatch => {
    try {
      const formData = {
        message
      }
      await api.post(`/message/${id}`, formData);
      dispatch(setAlert('Message sent successfully!', 'success'));
      //history.push('/dashboard');
    } catch (err) {
      //const errors = err.response.data.errors;
      //if (errors) {
        //errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      //}
  
      dispatch(setAlert('The message could not be sent, please try again later!', 'danger'));
    }
  }

  export const getMessages = () => async dispatch => {
    try {
      const res = await api.get('/message');
      dispatch({
        type: GET_MESSAGES,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  export const getMessage = (id) => async dispatch => {
    try {
      const res = await api.get(`/message/${id}`);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  }