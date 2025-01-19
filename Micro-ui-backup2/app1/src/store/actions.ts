
export const addFavorite = (item: any) => ({
  type: 'ADD_FAVORITE',
  payload: item,
});

export const removeFavorite = (item: any) => ({
  type: 'REMOVE_FAVORITE',
  payload: item,
});

export const setScrollPosition = (item: any) => ({
  type: 'SET_SCROLL_POSITION',
  payload: item,
});

export const setItems = (items: any) => ({
  type: 'SET_ITEMS',
  payload: items,
});

export const setPage = (page: number) => ({
  type: 'SET_PAGE',
  payload: page,
});