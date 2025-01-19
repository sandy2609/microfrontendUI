
const initialState = { 
  favorites: [], 
  items: [], 
  scrollPosition: 0, 
  page: 1
}

const app1Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(item => item?.id !== action.payload.id),
      };
    case 'SET_SCROLL_POSITION':
      return {
        ...state,
        scrollPosition: action.payload,
      };
    case 'SET_ITEMS':
      const unique = state.items.length > 0 ? [
        ...new Set([...state.items, ...action.payload.data].map(item => item))]: 
        action.payload.data;
      return {
        ...state,
        items: unique, page: action.payload.page
      };
      case 'SET_PAGE':
        return {
          ...state,
          page: action.payload,
      };
    default:
      return state;
  }
  
};

export default app1Reducer;