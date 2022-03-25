import { SearchConstants } from '@constants';

export function saveSearchInfo({ data, selectedCountry, selectedProcedure }) {
  return {
    type: SearchConstants.SAVE_SEARCH,
    data,
    selectedCountry,
    selectedProcedure,
  };
}
