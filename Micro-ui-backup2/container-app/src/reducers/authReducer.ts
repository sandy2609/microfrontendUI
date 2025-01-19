const initialState = {
    isAuthenticated: false,
    role: '',
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH':
        return {
          ...state,
          isAuthenticated: action.payload.isAuthenticated,
          role: action.payload.role,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  