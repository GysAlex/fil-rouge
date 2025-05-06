// État initial des filtres
const initialState = {
  filters: {
    meuble: false,
    minPrice: 0,
    maxPrice: 2000,
    studio: false,
    t1: false,
    t2: false,
    t3: false,
    distance: 10,
    chambreSimple: false,
    colocation: false,
    appartement: false,
    autre: false
  },
  activeFilters: []
};

// Actions
export const FILTER_ACTIONS = {
  SET_FILTER: 'SET_FILTER',
  RESET_FILTERS: 'RESET_FILTERS',
  TOGGLE_FILTER: 'TOGGLE_FILTER'
};

// Reducer
export function filterReducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_ACTIONS.SET_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value
        }
      };
    
    case FILTER_ACTIONS.TOGGLE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload]: !state.filters[action.payload]
        }
      };
    
    case FILTER_ACTIONS.RESET_FILTERS:
      return initialState;
    
    default:
      return state;
  }
}

// Action creators
export const setFilter = (key, value) => ({
  type: FILTER_ACTIONS.SET_FILTER,
  payload: { key, value }
});

export const toggleFilter = (key) => ({
  type: FILTER_ACTIONS.TOGGLE_FILTER,
  payload: key
});

export const resetFilters = () => ({
  type: FILTER_ACTIONS.RESET_FILTERS
}); 