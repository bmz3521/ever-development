import { SavelistConstants } from '@constants';

export function getSavelist({ userId, clinicId }) {
  return {
    type: SavelistConstants.GET_SAVELIST_REQUEST,
    userId,
    clinicId,
  };
}

export function getSavelistSuccess(result) {
  return {
    type: SavelistConstants.GET_SAVELIST_SUCCESS,
    result,
  };
}

export function getSavelistFailure(error) {
  return {
    type: SavelistConstants.GET_SAVELIST_FAILURE,
    error,
  };
}

export function createSavelist({ userId, name }) {
  return {
    type: SavelistConstants.CREATE_SAVELIST_REQUEST,
    userId,
    name,
  };
}

export function createSavelistSuccess(result) {
  return {
    type: SavelistConstants.CREATE_SAVELIST_SUCCESS,
    result,
  };
}

export function createSavelistFailure(error) {
  return {
    type: SavelistConstants.CREATE_SAVELIST_FAILURE,
    error,
  };
}

export function addItemSavelist({ savelistId, clinicId }) {
  return {
    type: SavelistConstants.ADD_ITEM_SAVELIST_REQUEST,
    savelistId,
    clinicId,
  };
}

export function addItemSavelistSuccess(result) {
  return {
    type: SavelistConstants.ADD_ITEM_SAVELIST_SUCCESS,
    result,
  };
}

export function addItemSavelistFailure(error) {
  return {
    type: SavelistConstants.ADD_ITEM_SAVELIST_FAILURE,
    error,
  };
}

export function deleteItemSavelist({ savelistId, clinicId }) {
  return {
    type: SavelistConstants.DELETE_ITEM_SAVELIST_REQUEST,
    savelistId,
    clinicId,
  };
}

export function deleteItemSavelistSuccess(result) {
  return {
    type: SavelistConstants.DELETE_ITEM_SAVELIST_SUCCESS,
    result,
  };
}

export function deleteItemSavelistFailure(error) {
  return {
    type: SavelistConstants.DELETE_ITEM_SAVELIST_FAILURE,
    error,
  };
}

export function clear(callback) {
  return {
    type: SavelistConstants.CLEAR_REQUEST,
    callback,
  };
}
export function clearSuccess() {
  return {
    type: SavelistConstants.CLEAR_SUCCESS,
  };
}
