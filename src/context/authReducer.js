
export const initialState = {
    isLoading: true,
    user: null,
    userToken: null
  }

 export const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          user: action.user,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          user: action.user,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
          user: null,
          userToken: null,
        };
      case 'REGISTER':
        return {
          ...prevState,
          isLoading: false,
          user: action.id,
          userToken: action.token,
        };
      case 'LOADING':
        return {
          ...prevState,
          isLoading: action.loading
        };
    }
  }