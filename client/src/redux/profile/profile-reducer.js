import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    NO_REPOS,
    GET_EXPERIENCE,
    GET_EDUCATION
  } from './profile-types';
  
  const initialState = {
    profile: null,
    profiles: [],
    experience: '',
    education: '',
    repos: [],
    loading: true,
    error: {}
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PROFILE:
      case UPDATE_PROFILE:
        return {
          ...state,
          profile: payload,
          experience: null,
          education: null,
          loading: false
        };
      case GET_PROFILES:
        return {
          ...state,
          profiles: payload,
          loading: false
        };
      case GET_EXPERIENCE:
          return {
            ...state,
            experience: payload,
            loading: false
          };
      case GET_EDUCATION:
        return {
          ...state,
          education: payload,
          loading: false
        };
      case PROFILE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
          profile: null
        };
      case CLEAR_PROFILE:
        return {
          ...state,
          profile: null,
          repos: [],
          experience: '',
          education: '',
        };
      case GET_REPOS:
        return {
          ...state,
          repos: payload,
          loading: false
        };
      case NO_REPOS:
        return {
          ...state,
          repos: []
        };
      default:
        return state;
    }
  }
  