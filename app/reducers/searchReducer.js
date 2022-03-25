import { SearchConstants } from '@constants';

const initialState = {
  data: [],
  selectedProcedure: '',
  selectedCountry: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SearchConstants.SAVE_SEARCH:
      return {
        data: action.data,
        selectedProcedure: action.selectedProcedure,
        selectedCountry: action.selectedCountry,
      };
    default:
      return state;
  }
};
