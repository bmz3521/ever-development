import { useSelector } from 'react-redux';
import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SavelistActions } from '@actions';

export default useHooks = ({ clinicId }) => {
  const user = useSelector(state => state.user.data);
  const savelist = useSelector(state => state.savelist.data);
  const [nameModalShow, setNameModalShow] = useState(false);
  const dispatch = useDispatch();

  const onCreate = useCallback(async text => {
    await dispatch(
      SavelistActions.createSavelist({ userId: user.userId, name: `${text}` }),
    );
  }, []);

  const getSavelist = useCallback(async () => {
    dispatch(
      SavelistActions.getSavelist({ userId: user.userId, clinicId: clinicId }),
    );
  }, [clinicId]);

  const onAddItem = async item => {
    try {
      await dispatch(
        SavelistActions.addItemSavelist({
          savelistId: item.id,
          clinicId: clinicId,
        }),
      );
    } catch (err) {
      console.log('error add item:>>', err);
    } finally {
      await getSavelist();
    }
  };

  const onDeleteItem = async item => {
    try {
      await dispatch(
        SavelistActions.deleteItemSavelist({
          savelistId: item.id,
          clinicId: clinicId,
        }),
      );
    } catch (err) {
      console.log('error delete savelist:>>', err);
    } finally {
      await getSavelist();
    }
  };

  useEffect(() => {
    getSavelist();
  }, [nameModalShow, onCreate]);

  return {
    actions: {
      onCreate,
      setNameModalShow,
      onAddItem,
      onDeleteItem,
      getSavelist,
    },
    savelist,
    nameModalShow,
  };
};
