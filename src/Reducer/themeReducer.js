export const themeReducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_THEME':
        return state === 'light' ? 'dark' : 'light';
      case 'SET_THEME':
        return action.payload;
      default:
        return state;
    }
  };
  