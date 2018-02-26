import axios from 'axios';
import  {browserHistory} from 'react-router';
import { AUTH_USER,
         UNAUTH_USER,
         AUTH_ERROR,
         FETCH_MESSAGE} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signInUser({email,password}) {

//With redux thunk, we can dispatch many actions at once to redux pipeline.
return function(dispatch) {
  //Submit email password to server,
  axios.post(`${ROOT_URL}/signin`,{ email,password })
    .then(response => {
      // if request succeeds:
      // update state to authenticated .
      dispatch({type:AUTH_USER}); //using redux-thunk to control the dispatch function.
      // save JWT token (in local storage on client. -> unique to domain stored by.)
      localStorage.setItem('token',response.data.token); //object available on window scope globally.
      // redirect to route '/feature' programmatically. (programmatic navigation)
      browserHistory.push('/feature');
    })
    .catch(() => {
      //If request is bad...
      // - Show an  error to the user.
      //Here redux thunk comes in use as we aren't using action from component and want to dispatch it manually,
      //in case request fails.
      dispatch(authError('Invalid email or password.'))
    });

}

}

export function authError(error) {
   return {
     type:AUTH_ERROR,
     payload:error
   };
}


export function signOutUser() {
  localStorage.removeItem('token');
  return {type:UNAUTH_USER};
}

export function signUpUser({email,password}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`,{ email,password })
      .then( response => {
        dispatch({type:AUTH_USER});
        localStorage.setItem('token',response.data.token);
        browserHistory.push('/feature');
      })
      .catch( response =>    dispatch(authError(response.response.data.error)) )
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL,{
      headers:{authorization:localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type:FETCH_MESSAGE,
          payload:response.data.message
        });
      });
  }
}
